import axios from 'axios';

// 1. 환경 변수 파일(.env)에 설정된 API 서버 주소를 가져온다. 
const serverURL = process.env.NEXT_PUBLIC_API_SERVER_URL; 

// 2. Axios 객체 생성
const apiClient = axios.create({
    baseURL : serverURL,
    withCredentials : true // API 요청 시 Refresh Token을 함께 전송 
})

// 3. 요청 처리 
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
)

// 4. 응답 인터셉터: 401 에러 시 재발급 → 저장 → 원래 요청 재시도
apiClient.interceptors.response.use(
    res => res,
    async error => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // 재발급 요청 (빈 바디, 쿠키 포함)
          const reissueRes = await axios.get(
            `${serverURL}/member/reissue`,
            {},
            { withCredentials: true }
          );
            
          // 헤더에서 새 Access Token 추출
          const authHeader = reissueRes.headers['authorization'];
          const newAccessToken = authHeader?.split(' ')[1];
          if (newAccessToken) {
            localStorage.setItem('token', newAccessToken);
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          }
  
          // 바디에 새 Refresh Token이 있으면 쿠키 덮어쓰기
          if (reissueRes.data?.refreshToken) {
            document.cookie = `refresh=${reissueRes.data.refreshToken}; path=/;`;
          }
  
          // 토큰 갱신 후 원래 요청 재시도
          return apiClient(originalRequest);

        } catch (refreshError) {
          // 재발급 실패 시 로컬 스토리지와 세션 스토리지에 있는 모든 값 삭제 후 로그인 페이지로 이동
          localStorage.clear()
          sessionStorage.clear()
          document.cookie = 'refresh=; path=/; max-age=0;';
        //  window.location.href = '/LoginPage';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  
  export default apiClient;



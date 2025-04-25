// 인증이 필요한 api 요청을 보낼 때 
import axios from 'axios'; 

// 1. 환경 변수 파일(.env)에 설정된 API 서버 주소를 가져온다. 
const serverURL = process.env.NEXT_PUBLIC_API_SERVER_URL; 

// 2. Axios 기본 인스턴스(apiRequest)를 생성한다. => 이후 요청에서 해당 객체를 재사용하여 요청을 보낸다.
const apiRequest = axios.create({
    baseURL : serverURL,
    withCredentials : true // API 요청 시 Refresh Token을 함께 전송 
})

// 3. 요청 처리 인터셉터터 : 모든 요청이 보내기지 전에 위 코드를 실행한다. 
apiRequest.interceptors.request.use(
    config => { // config : 요청에 대한 설정 객체 
        const token = localStorage.getItem('token'); // 로컬 스토리지에 저장된 access token을 꺼내서
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Authorization 헤더에 access token을 보낸다.
        }
        return config; // 위 코드를 기반으로 요청을 보냄 
    },
    error => Promise.reject(error) // 요청 설정 중 에러가 발생 시 해당 에러를 호출한 로직에 던진다. 
)

// 4. 서버에서 응답이 돌아왔을 때 가로채서 처리할 수 있는 인터셉터
apiRequest.interceptors.response.use(
    res => res, // 요청이 성공했을 때는 그대로 응답(res)을 반환한다. 

    async error => { // 요청이 실패했을 때 실행된다. 
      const originalRequest = error.config; // 실패한 요청 정보를 originalRequest 변수에 저장한다. 

      if (error.response?.status === 401 && !originalRequest._retry) { // 응답 코드가 401(토큰 만료)이고 false일 때
        // 즉, 재시도 하지 않은 요청일 때만 다시 시도하겠다! 
        
        originalRequest._retry = true; // 재시도 했음을 표시 
        try {
          // access token 재발급 요청 
          const reissue = await axios.get(
            `${serverURL}/member/reissue`,
            { withCredentials: true }
          );
            
          // 헤더에서 새 access token 추출
          const authHeader = reissue.headers['authorization'];
          const newAccessToken = authHeader?.split(' ')[1];
          if (newAccessToken) {
            localStorage.setItem('token', newAccessToken);
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          }
  
          // access token 갱신 후 원래 요청 재시도
          return apiRequest(originalRequest);

        } catch (refreshError) {

          // 재발급 실패 시 로컬 스토리지와 세션 스토리지에 있는 모든 값 삭제 후 로그인 페이지로 이동
          localStorage.clear()
          sessionStorage.clear()

          alert('로그인 정보가 만료되었습니다. 다시 로그인해 주세요.');

          window.location.href = '/LoginPage';
          return Promise.reject(refreshError); // 재발급 하는데 오류가 발생 시 해당 요청을 보낸 로직에 던진다.
        }
      }
      return Promise.reject(error); // 다른 에러 상태코드가 올 시 해당 요청을 보낸 로직에 던진다. 
    }
  );
  
  export default apiRequest;



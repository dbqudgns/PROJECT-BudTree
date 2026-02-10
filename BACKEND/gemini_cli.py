import requests
import google.generativeai as genai

# 설정 값
API_KEY = "Google 키 값"
SPRING_SERVER_URL = "http://localhost:8080/mcp/search"

genai.configure(api_key=API_KEY)

# print("사용 가능한 모델 목록:")
# for m in genai.list_models():
#     if 'generateContent' in m.supported_generation_methods:
#         print(f"- {m.name}")

# === [도구 정의: Spring Boot 연결] ===
def search_api_docs(keyword: str):
    """
    사용자가 특정 기능(예: 로그인, 좋아요, 자가진단 등등)의 API 명세나 사용법을 물어볼 때 사용합니다.
    Spring Boot 서버에서 API 스펙을 다음과 같은 양식으로 무조건 조회합니다.
    - 경로명(path) : 
    - 요청 메서드(method) :
    - 경로 매개변수 :
    - 쿼리 파라미터 :
    - 요청 DTO(DTO명, JSON 양식) : 

    이때 경로 매개변수, 쿼리파라미터, 요청 DTO가 null이라면 응답을 하지 않습니다.
    또한, 요청 DTO는 JSON 구조로 무조건 응답합니다. 
    """
    print(f"\n[System] 로컬 서버 검색 중!!! (키워드: {keyword})")
    try:
        res = requests.get(SPRING_SERVER_URL, params={"keyword": keyword})
        if res.status_code == 200:
            return res.text
        return "문서를 가져올 수 없습니다."
    except Exception as e:
        return f"연결 실패: {e}"

# === [모델 설정] ===
tools = [search_api_docs]
model = genai.GenerativeModel('gemini-2.5-flash-preview-09-2025', tools=tools)
chat = model.start_chat(enable_automatic_function_calling=True)

# === [CLI 실행] ===
print("==========================================")
print(" Swagger MCP 서버 시작! (with Spring Boot) ")
print("==========================================")

while True:
    user_input = input("\nUser: ")
    if user_input.lower() in ['q', 'exit']: break
    
    try:
        response = chat.send_message(user_input)
        print(f"Gemini: {response.text}")
    except Exception as e:
        print(f"[Error] {e}")
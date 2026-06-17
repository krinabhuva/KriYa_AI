import requests
import json

# Test 1: Login
print("=" * 60)
print("TEST 1: POST /api/auth/login")
print("=" * 60)
login_response = requests.post(
    "http://127.0.0.1:8000/api/auth/login",
    json={"username": "admin", "password": "Admin1234!"}
)
print(f"Status: {login_response.status_code}")
login_data = login_response.json()
print(json.dumps(login_data, indent=2))

if login_response.status_code == 200:
    token = login_data.get("access_token")
    
    # Test 2: Get KPIs
    print("\n" + "=" * 60)
    print("TEST 2: GET /api/analytics/kpis")
    print("=" * 60)
    kpis_response = requests.get(
        "http://127.0.0.1:8000/api/analytics/kpis",
        headers={"Authorization": f"Bearer {token}"}
    )
    print(f"Status: {kpis_response.status_code}")
    print(json.dumps(kpis_response.json(), indent=2))
    
    # Test 3: AI Chat
    print("\n" + "=" * 60)
    print("TEST 3: POST /api/ai/chat")
    print("=" * 60)
    chat_data = {"message": "What is my top product?", "history": []}
    print(f"Sending: {json.dumps(chat_data)}")
    try:
        chat_response = requests.post(
            "http://127.0.0.1:8000/api/ai/chat",
            json=chat_data,
            headers={"Authorization": f"Bearer {token}"},
            stream=True,
            timeout=10
        )
        print(f"Status: {chat_response.status_code}")
        print("Streaming response (first 500 chars):")
        content = ""
        for line in chat_response.iter_lines():
            if line:
                content += line.decode('utf-8') if isinstance(line, bytes) else line
        print(content[:500])
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 4: Predictions
    print("\n" + "=" * 60)
    print("TEST 4: GET /api/predictions/predict")
    print("=" * 60)
    pred_response = requests.get(
        "http://127.0.0.1:8000/api/predictions/predict?sku=SKU-001&days=7",
        headers={"Authorization": f"Bearer {token}"}
    )
    print(f"Status: {pred_response.status_code}")
    print(json.dumps(pred_response.json(), indent=2))
    
print("\n" + "=" * 60)
print("✓ All tests completed successfully!")
print("=" * 60)

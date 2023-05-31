import requests

link = "https://cdn-icons-png.flaticon.com/512/4436/4436481.png"
name = "foto.png"

response = requests.get(link)

with open(name, "wb") as f:
    f.write(response.content)

print(f)
print(response)

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

# Change to script directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), handler) as httpd:
    print(f"🚀 Xiaomi Website running at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    webbrowser.open(f"http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✅ Server stopped")

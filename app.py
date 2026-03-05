#!/usr/bin/env python3
"""
VT Home Streaming Platform - Heroku Web Server
A simple HTTP server to serve static files for Heroku deployment
"""

import http.server
import socketserver
import os
import sys

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler for better static file serving"""
    
    def end_headers(self):
        # Add security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        super().end_headers()
    
    def do_GET(self):
        # Handle SPA routing - redirect all routes to index.html
        if self.path != '/' and not os.path.exists(self.path[1:]) and '.' not in self.path:
            self.path = '/'
        return super().do_GET()

def run_server():
    """Run the HTTP server"""
    port = int(os.environ.get('PORT', 8000))
    
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print(f"🚀 Starting VT Home Streaming Platform on port {port}")
    print(f"📁 Serving files from: {os.getcwd()}")
    
    # Create and run the server
    with socketserver.TCPServer(("", port), MyHTTPRequestHandler) as httpd:
        print(f"✅ Server running at http://0.0.0.0:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            sys.exit(0)

if __name__ == "__main__":
    run_server()

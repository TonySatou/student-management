import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Server tĩnh nhẹ bằng Java thuần phục vụ ứng dụng Quản lý Sinh viên
 */
public class Server {
    private static final int PORT = 8080;

    public static void main(String[] args) {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
            server.createContext("/", new StaticFileHandler("."));
            server.setExecutor(null); // default executor
            System.out.println("==================================================");
            System.out.println("  HE THONG QUAN LY SINH VIEN - EDUMANAGE PRO");
            System.out.println("==================================================");
            System.out.println(" May chu dang chay tai: http://localhost:" + PORT);
            System.out.println(" Nhan Ctrl + C trong cua so nay de dung server.");
            System.out.println("==================================================");

            // Tự động mở trình duyệt mặc định
            try {
                if (java.awt.Desktop.isDesktopSupported() && java.awt.Desktop.getDesktop().isSupported(java.awt.Desktop.Action.BROWSE)) {
                    java.awt.Desktop.getDesktop().browse(new URI("http://localhost:" + PORT));
                } else {
                    Runtime.getRuntime().exec(new String[]{"cmd", "/c", "start", "http://localhost:" + PORT});
                }
            } catch (Exception ex) {
                System.out.println("Vui long mo trinh duyet va truy cap: http://localhost:" + PORT);
            }

            server.start();
        } catch (IOException e) {
            System.err.println("Loi khi khoi dong server: " + e.getMessage());
        }
    }

    static class StaticFileHandler implements HttpHandler {
        private final String baseDir;

        public StaticFileHandler(String baseDir) {
            this.baseDir = baseDir;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if (path == null || path.equals("/") || path.isEmpty()) {
                path = "/index.html";
            }

            Path filePath = Paths.get(baseDir, path.substring(1)).normalize();
            File file = filePath.toFile();

            if (!file.exists() || file.isDirectory()) {
                String response = "404 (Not Found)\nFile khong ton tai: " + path;
                exchange.sendResponseHeaders(404, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
                return;
            }

            String mimeType = getMimeType(file.getName());
            exchange.getResponseHeaders().set("Content-Type", mimeType + "; charset=utf-8");
            exchange.sendResponseHeaders(200, file.length());

            OutputStream os = exchange.getResponseBody();
            try (FileInputStream fis = new FileInputStream(file)) {
                byte[] buffer = new byte[8192];
                int bytesRead;
                while ((bytesRead = fis.read(buffer)) != -1) {
                    os.write(buffer, 0, bytesRead);
                }
            }
            os.close();
        }

        private String getMimeType(String fileName) {
            String lower = fileName.toLowerCase();
            if (lower.endsWith(".html") || lower.endsWith(".htm")) return "text/html";
            if (lower.endsWith(".css")) return "text/css";
            if (lower.endsWith(".js")) return "application/javascript";
            if (lower.endsWith(".json")) return "application/json";
            if (lower.endsWith(".svg")) return "image/svg+xml";
            if (lower.endsWith(".png")) return "image/png";
            if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
            if (lower.endsWith(".ico")) return "image/x-icon";
            if (lower.endsWith(".xlsx")) return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            if (lower.endsWith(".csv")) return "text/csv";
            return "application/octet-stream";
        }
    }
}

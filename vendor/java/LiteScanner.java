// Lightweight stand-in for java.util.Scanner over System.in (the real one pulls in regex+locale: ~5 s compile, 4.8 MB wasm).
public class __Scanner implements java.io.Closeable {
  private final java.io.InputStream in;
  private int peeked = -2;
  public __Scanner(java.io.InputStream in) { this.in = in; }
  public __Scanner(String s) { this.in = new java.io.ByteArrayInputStream(s.getBytes()); }
  private int peek() { if (peeked == -2) { try { peeked = in.read(); } catch (java.io.IOException e) { peeked = -1; } } return peeked; }
  private int read() { int c = peek(); peeked = -2; return c; }
  private static boolean ws(int c) { return c == ' ' || c == '\n' || c == '\r' || c == '\t' || c == '\f'; }
  private void skipWs() { while (peek() != -1 && ws(peek())) read(); }
  private String buffered = null;   // token read ahead by hasNextX
  public boolean hasNext() { if (buffered != null) return true; skipWs(); return peek() != -1; }
  public String next() {
    if (buffered != null) { String t = buffered; buffered = null; return t; }
    skipWs(); if (peek() == -1) throw new java.util.NoSuchElementException();
    StringBuilder sb = new StringBuilder(); while (peek() != -1 && !ws(peek())) sb.append((char) read());
    return sb.toString();
  }
  private String token() { String t = next(); return t; }
  public int nextInt() { String t = token(); try { return Integer.parseInt(t); } catch (NumberFormatException e) { buffered = t; throw new java.util.InputMismatchException("For input string: \"" + t + "\""); } }
  public long nextLong() { String t = token(); try { return Long.parseLong(t); } catch (NumberFormatException e) { buffered = t; throw new java.util.InputMismatchException("For input string: \"" + t + "\""); } }
  public double nextDouble() { String t = token(); try { return Double.parseDouble(t); } catch (NumberFormatException e) { buffered = t; throw new java.util.InputMismatchException("For input string: \"" + t + "\""); } }
  public float nextFloat() { return (float) nextDouble(); }
  public boolean nextBoolean() { String t = token(); if (t.equalsIgnoreCase("true")) return true; if (t.equalsIgnoreCase("false")) return false; buffered = t; throw new java.util.InputMismatchException(t); }
  public boolean hasNextInt() { if (!hasNext()) return false; if (buffered == null) buffered = next(); try { Integer.parseInt(buffered); return true; } catch (NumberFormatException e) { return false; } }
  public boolean hasNextLong() { if (!hasNext()) return false; if (buffered == null) buffered = next(); try { Long.parseLong(buffered); return true; } catch (NumberFormatException e) { return false; } }
  public boolean hasNextDouble() { if (!hasNext()) return false; if (buffered == null) buffered = next(); try { Double.parseDouble(buffered); return true; } catch (NumberFormatException e) { return false; } }
  public boolean hasNextLine() { return buffered != null || peek() != -1; }
  public String nextLine() {
    StringBuilder sb = new StringBuilder();
    if (buffered != null) { sb.append(buffered); buffered = null; }
    if (peek() == -1 && sb.length() == 0) throw new java.util.NoSuchElementException("No line found");
    int c; while ((c = read()) != -1 && c != '\n') if (c != '\r') sb.append((char) c);
    return sb.toString();
  }
  public void close() {}
}

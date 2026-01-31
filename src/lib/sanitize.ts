import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Uses DOMPurify which works both on server and client side
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  // Configure DOMPurify to allow safe HTML elements and attributes
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "a", "b", "i", "em", "strong", "u", "s", "strike", "del", "ins",
      "p", "br", "hr", "span", "div",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li",
      "blockquote", "pre", "code",
      "table", "thead", "tbody", "tr", "th", "td",
      "img", "figure", "figcaption",
      "mark", "small", "sub", "sup",
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel", "src", "alt", "title", "class", "id",
      "width", "height", "style",
    ],
    // Force all links to open in new tab with security attributes
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ["target", "rel"],
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover"],
  });
}

/**
 * Sanitizes HTML and adds security attributes to links
 */
export function sanitizeHtmlWithSecureLinks(html: string): string {
  if (!html) return "";

  const sanitized = sanitizeHtml(html);

  // Add rel="noopener noreferrer" to all external links
  return sanitized.replace(
    /<a\s+([^>]*href=["'][^"']*["'][^>]*)>/gi,
    (match, attrs) => {
      // Check if it already has rel attribute
      if (attrs.includes("rel=")) {
        return match;
      }
      // Add target="_blank" for external links and security attributes
      if (attrs.includes("http")) {
        return `<a ${attrs} target="_blank" rel="noopener noreferrer">`;
      }
      return match;
    }
  );
}

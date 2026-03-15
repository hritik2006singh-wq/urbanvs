/**
 * Strip HTML tags and dangerous characters from user input.
 * Use on all user-supplied strings before storing in DB or sending in emails.
 */
export function sanitizeString(input: unknown, maxLength = 1000): string {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/<[^>]*>/g, '')           // strip HTML tags
    .replace(/javascript:/gi, '')      // strip JS protocol
    .replace(/on\w+\s*=/gi, '')        // strip event handlers
    .replace(/[<>'"]/g, (c) => ({      // HTML-encode special chars
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }[c] ?? c))
}

export function sanitizeEmail(input: unknown): string {
  if (typeof input !== 'string') return ''
  const clean = input.trim().toLowerCase().slice(0, 254)
  // Basic RFC 5321 email regex
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(clean) ? clean : ''
}

export function sanitizePhone(input: unknown): string {
  if (typeof input !== 'string') return ''
  // Allow digits, +, spaces, dashes only
  return input.replace(/[^0-9+\s\-]/g, '').slice(0, 20)
}

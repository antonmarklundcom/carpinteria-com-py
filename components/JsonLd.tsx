/** Renders a JSON-LD <script> block. Server component. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline as ld+json.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

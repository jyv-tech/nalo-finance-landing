"use client";

import React from "react";
import Image from "next/image";
import { sanitizeHtml } from "@/lib/sanitize";

// Editor.js data structure (v2.31.0)
interface EditorJSData {
  time?: number;
  version?: string;
  blocks: EditorJSBlock[];
}

interface EditorJSBlock {
  id: string;
  type: string;
  data: any;
}

interface ListItem {
  content: string;
  items?: ListItem[];
  meta?: Record<string, any>;
}

interface EditorContentProps {
  content: EditorJSData | string;
  className?: string;
}

export function EditorContent({ content, className = "" }: EditorContentProps) {
  // Handle case where content is a JSON string
  let parsedContent: EditorJSData | null = null;

  if (typeof content === "string") {
    try {
      parsedContent = JSON.parse(content);
    } catch {
      return null;
    }
  } else {
    parsedContent = content;
  }

  if (!parsedContent?.blocks?.length) return null;

  return (
    <div
      className={`prose prose-lg max-w-none
        prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
        prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-900 prose-pre:text-gray-100
        prose-img:rounded-lg prose-img:border-2 prose-img:border-border
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:text-muted-foreground
        ${className}`}
    >
      {parsedContent.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: EditorJSBlock }) {
  switch (block.type) {
    case "paragraph":
      return <ParagraphBlock data={block.data} />;

    case "header":
      return <HeaderBlock data={block.data} />;

    case "list":
      return <ListBlock data={block.data} />;

    case "image":
      return <ImageBlock data={block.data} />;

    case "code":
      return <CodeBlock data={block.data} />;

    case "quote":
      return <QuoteBlock data={block.data} />;

    case "delimiter":
      return <hr className="my-8 border-t-2 border-border" />;

    case "table":
      return <TableBlock data={block.data} />;

    default:
      // Log unknown block types in development
      if (process.env.NODE_ENV === "development") {
        console.warn(`Unknown Editor.js block type: ${block.type}`, block.data);
      }
      return null;
  }
}

// Paragraph block
function ParagraphBlock({ data }: { data: { text: string } }) {
  if (!data.text?.trim()) return null;
  return (
    <p
      className="mb-4 leading-relaxed text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.text) }}
    />
  );
}

// Header block (h1-h6)
function HeaderBlock({ data }: { data: { text: string; level: number } }) {
  const level = Math.min(Math.max(data.level || 2, 1), 6);
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  // Styling based on header level
  const styles: Record<number, string> = {
    1: "text-3xl md:text-4xl mt-12 mb-6 font-black uppercase tracking-tight",
    2: "text-2xl md:text-3xl mt-12 mb-6 font-black uppercase tracking-tight",
    3: "text-xl md:text-2xl mt-10 mb-4 font-black uppercase tracking-tight",
    4: "text-lg md:text-xl mt-8 mb-4 font-bold",
    5: "text-base md:text-lg mt-6 mb-3 font-bold",
    6: "text-sm md:text-base mt-4 mb-2 font-bold",
  };

  return (
    <Tag
      className={styles[level]}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.text) }}
    />
  );
}

// List block with nested item support
// Handles both old format (string[]) and new format (ListItem[])
function ListBlock({
  data,
}: {
  data: { style: string; items: (string | ListItem)[] };
}) {
  const isOrdered = data.style === "ordered";

  const renderItems = (items: (string | ListItem)[], depth = 0): React.JSX.Element => {
    const Tag = isOrdered ? "ol" : "ul";

    return (
      <Tag className={depth > 0 ? "mt-2 ml-4" : ""}>
        {items.map((item, idx) => {
          // Handle both string items (old format) and object items (new format)
          const content = typeof item === "string" ? item : item.content;
          const nestedItems = typeof item === "object" && item.items?.length ? item.items : null;

          return (
            <li key={idx}>
              <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
              {nestedItems && renderItems(nestedItems, depth + 1)}
            </li>
          );
        })}
      </Tag>
    );
  };

  if (!data.items?.length) return null;
  return <div className="my-6">{renderItems(data.items)}</div>;
}

// Image block
function ImageBlock({
  data,
}: {
  data: {
    file: { url: string };
    caption?: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
  };
}) {
  const imageUrl = data.file?.url;
  if (!imageUrl) return null;

  return (
    <figure
      className={`my-8 ${data.stretched ? "w-full" : ""} ${
        data.withBackground ? "bg-muted p-4 rounded-lg" : ""
      }`}
    >
      <Image
        src={imageUrl}
        alt={data.caption || ""}
        width={800}
        height={450}
        className={`w-full h-auto ${data.withBorder ? "border-2 border-border" : ""}`}
        unoptimized={imageUrl.includes("cloudfront.net")}
      />
      {data.caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
}

// Code block
function CodeBlock({ data }: { data: { code: string } }) {
  if (!data.code?.trim()) return null;
  return (
    <pre className="overflow-x-auto">
      <code>{data.code}</code>
    </pre>
  );
}

// Quote block
function QuoteBlock({ data }: { data: { text: string; caption?: string } }) {
  return (
    <blockquote>
      <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.text) }} />
      {data.caption && (
        <cite className="text-sm text-muted-foreground">— {sanitizeHtml(data.caption)}</cite>
      )}
    </blockquote>
  );
}

// Table block
function TableBlock({
  data,
}: {
  data: { withHeadings?: boolean; content: string[][] };
}) {
  if (!data.content?.length) return null;

  // Filter out empty columns (columns where all cells are empty or whitespace)
  const columnCount = Math.max(...data.content.map(row => row.length));
  const nonEmptyColumns: number[] = [];

  for (let col = 0; col < columnCount; col++) {
    const hasContent = data.content.some(row => row[col]?.trim());
    if (hasContent) {
      nonEmptyColumns.push(col);
    }
  }

  // Filter rows to only include non-empty columns
  const filteredContent = data.content.map(row =>
    nonEmptyColumns.map(colIdx => row[colIdx] || "")
  );

  if (!filteredContent.length || !nonEmptyColumns.length) return null;

  const hasHeadings = data.withHeadings && filteredContent.length > 1;
  const headers = hasHeadings ? filteredContent[0] : null;
  const rows = hasHeadings ? filteredContent.slice(1) : filteredContent;

  // Skip rendering if no data rows
  if (!rows.length) return null;

  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full border-collapse border-2 border-border">
        {headers && (
          <thead>
            <tr className="bg-muted">
              {headers.map((cell, idx) => (
                <th
                  key={idx}
                  className="border-2 border-border px-4 py-3 text-left font-black uppercase text-sm"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(cell) }}
                />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="border-2 border-border px-4 py-3 text-sm"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(cell) }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

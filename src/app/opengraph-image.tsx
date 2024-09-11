import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "クチコミ仲間 - 共通の場所でクチコミした仲間を探す";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            borderRadius: "50%",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src="https://review-connect.vercel.app/android-chrome-512x512.png"
            width="120"
            height="120"
            alt="クチコミ仲間 アイコン"
          />
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#1a1a1a",
            marginTop: 40,
            marginBottom: 20,
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          クチコミ仲間
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#333",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: 1.4,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "10px 20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          共通の場所でクチコミした仲間を探す
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
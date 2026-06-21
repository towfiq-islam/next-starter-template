import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        zIndex: 99999,
      }}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#ffffff",
          color: "#111827",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "14px 16px",
          fontSize: "15px",
          fontWeight: "600",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
        },

        success: {
          iconTheme: {
            primary: "#274f45",
            secondary: "#ffffff",
          },
        },

        error: {
          iconTheme: {
            primary: "#8b200c",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}

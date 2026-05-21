"use client";

import { useEffect, useState } from "react";

interface Settings {
  notifications: { in_app: boolean; email: boolean; whatsapp: boolean };
  digest_delivery_time_local: string;
  language: "es" | "en";
  alert_threshold: number;
}

const DEFAULT_SETTINGS: Settings = {
  notifications: { in_app: true, email: true, whatsapp: false },
  digest_delivery_time_local: "07:00",
  language: "es",
  alert_threshold: 0.85,
};

export default function ResearchSettings(): JSX.Element {
  const [s, setS] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void fetch("/api/research/settings")
      .then((r) => r.json())
      .then((j: { ok: boolean; settings?: Settings }) => {
        if (j.ok && j.settings) setS(j.settings);
      })
      .catch(() => {
        /* keep defaults */
      });
  }, []);

  async function save(): Promise<void> {
    await fetch("/api/research/settings", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(s),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-xl font-semibold">Preferencias de investigación</h1>

      <fieldset className="mt-6 space-y-2">
        <legend className="text-sm font-semibold">Notificaciones</legend>
        {(["in_app", "email", "whatsapp"] as const).map((k) => (
          <label key={k} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={s.notifications[k]}
              onChange={(e) => setS((p) => ({ ...p, notifications: { ...p.notifications, [k]: e.target.checked } }))}
            />
            {k === "in_app" ? "En la app" : k === "email" ? "Email" : "WhatsApp (vía Twilio)"}
          </label>
        ))}
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">Entrega del digesto</legend>
        <label className="mt-2 flex items-center gap-2 text-sm">
          Hora local (Chile):
          <input
            type="time"
            value={s.digest_delivery_time_local}
            onChange={(e) => setS((p) => ({ ...p, digest_delivery_time_local: e.target.value }))}
            className="rounded border border-neutral-300 px-2 py-1"
          />
        </label>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">Idioma</legend>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <select
            value={s.language}
            onChange={(e) => setS((p) => ({ ...p, language: e.target.value as "es" | "en" }))}
            className="rounded border border-neutral-300 px-2 py-1"
          >
            <option value="es">Español (default)</option>
            <option value="en">English</option>
          </select>
        </label>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">Umbral de alerta</legend>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input
            type="range"
            min={0.5}
            max={1.0}
            step={0.05}
            value={s.alert_threshold}
            onChange={(e) => setS((p) => ({ ...p, alert_threshold: Number(e.target.value) }))}
          />
          <span className="font-mono">{s.alert_threshold.toFixed(2)}</span>
        </label>
        <p className="text-xs text-neutral-500">Default 0.85. Subir reduce ruido; bajar aumenta cobertura.</p>
      </fieldset>

      <div className="mt-8 flex items-center gap-3">
        <button type="button" onClick={() => void save()} className="rounded bg-neutral-900 px-3 py-1 text-sm text-white">
          Guardar
        </button>
        {saved ? <span className="text-xs text-green-700">guardado</span> : null}
      </div>
    </div>
  );
}

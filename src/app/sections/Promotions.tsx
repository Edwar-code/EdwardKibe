"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Promotion() {
  const t = useTranslations("Promotion");

  return (
    <section id="promotion" className="w-full py-16 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-transparent p-6 md:p-10 text-center"
      >
        <span className="inline-block rounded-full bg-yellow-400 px-4 py-1 text-xs font-bold uppercase tracking-wider text-black">
          {t("badge")}
        </span>

        <p className="mt-4 text-sm font-medium uppercase tracking-widest text-yellow-400">
          {t("header")}
        </p>

        <h2 className="mt-2 text-3xl md:text-4xl font-bold">
          {t("title")}
        </h2>

        <p className="mt-4 text-base md:text-lg text-gray-300">
          {t("description")}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="rounded-xl bg-black/40 px-6 py-4">
            <p className="text-4xl font-extrabold text-yellow-400">
              {t("price")}
            </p>
            <p className="text-xs uppercase tracking-wider text-gray-400">
              {t("duration")}
            </p>
          </div>

          <ul className="text-left space-y-2 text-sm md:text-base">
            <li>✅ {t("features1")}</li>
            <li>✅ {t("features2")}</li>
            <li>✅ {t("features3")}</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-300 transition"
          >
            {t("buttonClaim")}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-3 font-semibold hover:bg-white/10 transition"
          >
            {t("buttonContact")}
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-500">{t("note")}</p>
      </motion.div>
    </section>
  );
}

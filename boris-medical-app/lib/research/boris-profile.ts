/**
 * Immutable clinical context for Boris Buvinic Guerovich.
 * This file is the source of truth for relevance scoring and the system prompt.
 * Do NOT mutate. Updates land via a new versioned file + migration.
 */

export const BORIS_PROFILE = {
  identity: {
    name: "Boris Buvinic Guerovich",
    dob: "1960-01-09",
    age_years_at: (d: Date) => Math.floor((d.getTime() - new Date("1960-01-09").getTime()) / (365.25 * 24 * 3600 * 1000)),
    location: "Santiago de Chile",
    institution: "Clínica Las Condes",
    oncologist: "Dr. Suraj Samtani",
    radiation_oncologist: "Dr. Rodrigo Barrientos",
  },
  diagnosis: {
    primary: "mid-rectal adenocarcinoma",
    diagnosed: "2020-01",
    pathology: "moderately differentiated tubular adenocarcinoma, G2",
    staging_post_surgery: "ypT3N1a",
    surgery_date: "2022-12-16",
    course: "locally advanced → curative-intent RAPIDO-like + surgery → metachronous metastatic relapse → multi-line systemic + repeated SBRT for oligoprogression",
  },
  current_state: {
    as_of: "2026-05-01",
    regimen: "FOLFIRI + Cetuximab",
    regimen_since: "2025-04",
    cea: { value_ng_ml: 14.6, peak: 35, trend: "decreasing" },
    ecog: 1,
    lifestyle: "active (cycling)",
    last_pet_date: "2026-04-27",
    last_pet_findings: [
      "response in previously treated sites",
      "NEW left perirectal node",
      "NEW prevascular mediastinal lymph node (indeterminate)",
    ],
    planned: "SBRT for new perirectal lesion",
    total_chemo_cycles: 54,
  },
  molecular: {
    msi: { status: "MSS", value_pct: 4.47 },
    tmb: { level: "low", value_mut_mb: 5.36 },
    mgmt_promoter: { methylated: true, ihc_protein_loss_confirmed: false },
    kras: "wild-type",
    nras: "wild-type",
    braf: "wild-type",
    her2: { positive: false, value_pct: 0 },
    hrd: { positive: false, value: 33 },
    ts: { positive: false, value_pct: 5, predicts: "5-FU sensitivity" },
    ercc1: { level: "high", value_pct: 100, predicts: "oxaliplatin resistance" },
    pd_l1: { level: "low", value_pct: 0 },
    cd8_infiltration: { positive: true, value_pct: 10 },
    fusions: { ntrk: false, ros1: false, alk: false, ret: false },
    key_mutations: [
      { gene: "APC", variant: "E1309Dfs*4", vaf: 71.91 },
      { gene: "TP53", variant: "R273H", vaf: 49.93 },
      { gene: "TP53", variant: "T155I", vaf: 24.35 },
      { gene: "ARAF", variant: "S214P", vaf: 79.46 },
    ],
    loh: ["FBXW7", "CDKN2B", "BAP1", "BLM", "RAD54L", "FANCD2"],
    panel_source: "OncoDEEP",
    panel_validated_date: "2024-06-27",
  },
  vascular_history: {
    finding: "Dilatación aneurismática de arteria hepática común, con presencia de disecciones focales y trombos murales a nivel de la arteria hepática",
    documented_date: "2023-10-23",
    decision_critical_for: ["bevacizumab", "fruquintinib", "regorafenib", "VEGF-pathway"],
  },
  treatment_history: [
    { line: 1, regimen: "RAPIDO (short-course RT + FOLFOX)", indication: "primary", date_range: "2022" },
    { line: 2, regimen: "Rectal surgery", date: "2022-12-16" },
    { line: 3, regimen: "FOLFIRI + bevacizumab", cycles: 12, indication: "post-recurrence", date_range: "2023" },
    { line: 4, regimen: "Hepatic metastasectomy (4 lesions, margins free)", date: "2023-11-15" },
    { line: 5, regimen: "FOLFOX + Cetuximab", cycles: 12, outcome: "complete hepatic remission", date_range: "2024-08" },
    { line: 6, regimen: "FOLFIRI + Cetuximab", date_range: "2025-04 → present" },
    { line: "SBRT-1", regimen: "SBRT pulmonary bilateral 48 Gy / 4 fr", date: "2025-02" },
    { line: "SBRT-2", regimen: "SBRT obturator LN 40 Gy / 5 fr + apical right lung 34 Gy / 1 fr", date: "2026-01" },
    { line: "SBRT-3 (planned)", regimen: "SBRT for new perirectal lesion", date: "post-2026-04" },
  ],
} as const;

export type BorisProfile = typeof BORIS_PROFILE;

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculateDiagnosisResult } from "@/lib/diagnosis";
import type { DiagnosisDefinition } from "@/types";

export function DiagnosisQuestionFlow({ diagnosis }: { diagnosis: DiagnosisDefinition }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const question = diagnosis.questions[index];
  const progress = ((index + 1) / diagnosis.questions.length) * 100;
  const selected = answers[index];

  const canNext = useMemo(() => typeof selected === "number", [selected]);

  function selectOption(optionIndex: number) {
    setAnswers((current) => {
      const next = [...current];
      next[index] = optionIndex;
      return next;
    });
  }

  function next() {
    if (!canNext) return;
    if (index === diagnosis.questions.length - 1) {
      const result = calculateDiagnosisResult(diagnosis, answers);
      router.push(`/diagnosis/${diagnosis.slug}/result?type=${encodeURIComponent(result)}`);
      return;
    }
    setIndex((current) => current + 1);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <div className="flex items-center justify-between text-sm font-bold text-zinc-700">
          <span>{diagnosis.title}</span>
          <span>{index + 1}/{diagnosis.questions.length}</span>
        </div>
        <div className="mt-3 h-3 rounded-full bg-white">
          <div className="h-3 rounded-full bg-gradient-to-r from-rose-300 to-violet-300 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Card className="p-5 md:p-7">
        <p className="text-sm font-bold text-rose-500">Question {index + 1}</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-normal text-zinc-950">{question.question}</h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{question.helper}</p>
        <div className="mt-6 space-y-3">
          {question.options.map((option, optionIndex) => (
            <button
              key={option.label}
              onClick={() => selectOption(optionIndex)}
              className={`w-full rounded-[1.25rem] border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft ${
                selected === optionIndex ? "border-zinc-950 ring-4 ring-rose-100" : "border-border"
              }`}
            >
              <span className="block text-base font-extrabold text-zinc-950">{option.label}</span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">{option.description}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button variant="secondary" disabled={index === 0} onClick={() => setIndex((current) => current - 1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Button>
          <Button disabled={!canNext} onClick={next}>
            {index === diagnosis.questions.length - 1 ? "結果を見る" : "次へ"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

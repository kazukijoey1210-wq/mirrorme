"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function SearchFilters() {
  return (
    <div className="glass-panel rounded-[1.5rem] p-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-11" placeholder="ジャンル、名前、エリアで検索" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
        <Select defaultValue="">
          <option value="">得意ジャンル</option>
          <option>韓国風</option>
          <option>古着ミックス</option>
          <option>きれいめ</option>
          <option>ストリート</option>
        </Select>
        <Select defaultValue="">
          <option value="">骨格タイプ</option>
          <option>ストレート</option>
          <option>ウェーブ</option>
          <option>ナチュラル</option>
        </Select>
        <Select defaultValue="">
          <option value="">カラー</option>
          <option>イエベ春</option>
          <option>ブルベ夏</option>
          <option>イエベ秋</option>
          <option>ブルベ冬</option>
        </Select>
        <Select defaultValue="">
          <option value="">価格帯</option>
          <option>〜¥1,500</option>
          <option>¥1,500〜¥3,000</option>
          <option>¥3,000〜</option>
        </Select>
        <Select defaultValue="rating">
          <option value="rating">評価順</option>
          <option value="new">新着順</option>
        </Select>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge variant="dark"><SlidersHorizontal className="mr-1 h-3 w-3" />オンライン対応</Badge>
        <Badge variant="outline">予約可能</Badge>
        <Badge variant="outline">学生価格</Badge>
      </div>
    </div>
  );
}

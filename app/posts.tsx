"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Suspense } from "react";
import useSWR from "swr";
import dayjs from "dayjs";
import { cn } from "./utils";

type SortSetting = ["date" | "views", "desc" | "asc"];

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function Posts({ posts: initialPosts }) {
  const [sort, setSort] = useState<SortSetting>(["date", "desc"]);
  const { data: posts } = useSWR("/api/posts", fetcher, {
    fallbackData: initialPosts,
    refreshInterval: 5000,
  });

  function sortDate() {
    setSort(sort => [
      "date",
      sort[0] !== "date" || sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  function sortViews() {
    setSort(sort => [
      sort[0] === "views" && sort[1] === "asc" ? "date" : "views",
      sort[0] !== "views" ? "desc" : sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  return (
    <Suspense fallback={null}>
      <main className="w-full font-mono m-auto mb-10 text-sm">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-gray-500 dark:text-gray-600 text-xs">
              <th
                className={cn(
                  "cursor-pointer w-20 h-9 text-left p-2",
                  sort[0] === "date" && "text-gray-700 dark:text-gray-400"
                )}
                onClick={sortDate}
              >
                date
                {sort[0] === "date" && (sort[1] === "asc" ? " ↑" : " ↓")}
              </th>
              <th className="text-left p-2">titles</th>
              <th className="text-left p-2 w-50">tags</th>
              <th
                className={cn(
                  "cursor-pointer w-20 text-left p-2",
                  sort[0] === "views" && "text-gray-700 dark:text-gray-400"
                )}
                onClick={sortViews}
              >
                views
                {sort[0] === "views" && (sort[1] === "asc" ? " ↑" : " ↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            <List posts={posts} sort={sort} />
          </tbody>
        </table>
      </main>
    </Suspense>
  );
}

function List({ posts, sort }) {
  const sortedPosts = useMemo(() => {
    const [sortKey, sortDirection] = sort;

    return [...posts].sort((a, b) => {
      if (sortKey === "date") {
        return sortDirection === "desc"
          ? dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
          : dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
      } else {
        return sortDirection === "desc" ? b.views - a.views : a.views - b.views;
      }
    });
  }, [posts, sort]);

  return (
    <>
      {sortedPosts.map((post, i: number) => {
        const date = dayjs(post.date);
        const firstOfMonth =
          !sortedPosts[i - 1] ||
          date.month() !== dayjs(sortedPosts[i - 1].date).month();
        const href = `/${date.year()}/${date.month() + 1}/${post.id}`;

        return (
          <tr
            key={post.id}
            className="border-t border-gray-200 dark:border-[#313131]"
          >
            <td className="p-2">
              {firstOfMonth && (
                <span className="text-gray-500 dark:text-gray-500">
                  {date.format("YYYY-MM")}
                </span>
              )}
            </td>
            <td className="p-3">
              <Link href={href} className="dark:text-gray-100 line-clamp-1">
                {post.title}
              </Link>
            </td>
            <td className="p-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-block px-1 text-xs bg-gray-200 dark:bg-[#333] rounded-sm mr-1"
                >
                  {tag}
                </span>
              ))}
            </td>
            <td className="p-2 text-gray-500 dark:text-gray-500 text-xs">
              {post.viewsFormatted}
            </td>
          </tr>
        );
      })}
    </>
  );
}

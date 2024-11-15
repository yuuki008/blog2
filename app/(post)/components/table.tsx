import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
        <>{children}</>
      </table>
    </div>
  );
}

export function Thead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-gray-100 dark:bg-gray-800">
      <tr>{children}</tr>
    </thead>
  );
}

export function Tbody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
      <>{children}</>
    </th>
  );
}

export function Td({ children }: { children: ReactNode }) {
  return (
    <td className="px-4 py-2 text-gray-600 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600">
      <>{children}</>
    </td>
  );
}

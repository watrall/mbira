import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DataTable } from "../data-table";

type Row = { id: string; name: string; status: string };

describe("DataTable", () => {
  it("renders rows and empty state", () => {
    render(
      <DataTable<Row>
        columns={[
          { key: "name", header: "Name" },
          { key: "status", header: "Status" },
        ]}
        data={[{ id: "1", name: "Main Gallery", status: "Published" }]}
        getRowId={(row) => row.id}
      />,
    );

    expect(screen.getByText(/main gallery/i)).toBeInTheDocument();
  });

  it("shows empty placeholder when no rows", () => {
    render(
      <DataTable<Row>
        columns={[{ key: "name", header: "Name" }]}
        data={[]}
        getRowId={(row) => row.id}
        emptyState="Nothing yet"
      />,
    );

    expect(screen.getByText(/nothing yet/i)).toBeInTheDocument();
  });
});

/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useSortBy,
  usePagination,
  useExpanded,
  useGlobalFilter,
} from "react-table";
import classNames from "classnames";
import { ThreeDots } from "react-loader-spinner";

const Table = ({
  columns: tableColumns,
  data: tableData,
  renderRowSubComponent,
  tableInitials,
  isLoading,
  showTablePagination,
  searchValue,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    rows,
    visibleColumns,
    state: { expanded, pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: tableInitials,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className="w-full relative">
        {isLoading && (
          <div className="flex items-center justify-center w-full h-full absolute z-50 pt-24">
            <ThreeDots
              ariaLabel="loading-indicator"
              height="100"
              width="100"
              radius={10}
              color="#5e17eb"
            />
          </div>
        )}
        <table className="w-full" {...getTableProps()}>
          <thead className="bg-theme-main">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="px-7 py-6 text-base font-semibold text-white text-left whitespace-nowrap"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.canSort ? (
                      <img
                        className="inline column-sort-icon"
                        src="/assets/icons/action-icons/sort-white.svg"
                        alt=""
                      />
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className="w-full border border-theme-border-line"
            {...getTableBodyProps()}
          >
            {page.map((row, idx) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <React.Fragment {...row.getRowProps()}>
                  <tr
                    className={
                      row.isExpanded
                        ? "bg-theme-main-bg border-l-2 border-theme-main"
                        : ""
                    }
                  >
                    {row.cells.map((cell) => (
                      <td
                        className={classNames(
                          "px-7 py-4 text-base font-normal text-theme-font-body text-left border-b"
                        )}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                  {row.isExpanded ? (
                    <tr className="border-l-2 border-theme-main">
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {showTablePagination && (
        <div className="flex flex-row justify-center items-center py-8 gap-x-5 text-theme-font text-base font-normal">
          <div
            className={classNames(
              { "cursor-pointer": canPreviousPage },
              {
                "text-theme-icon-color cursor-not-allowed": !canPreviousPage,
              }
            )}
            onClick={() => {
              if (canPreviousPage) {
                previousPage();
              }
            }}
          >
            Prev
          </div>
          {pageOptions.map((no) => {
            if (no < 5) {
              return (
                <div
                  key={no}
                  className={classNames("cursor-pointer", {
                    "bg-theme-main text-white px-2 py rounded-full":
                      no === pageIndex,
                  })}
                  onClick={() => gotoPage(no)}
                >
                  {no + 1}
                </div>
              );
            }
            if (no === pageIndex) {
              return (
                <div
                  key={no}
                  className={classNames("cursor-pointer", {
                    "bg-theme-main text-white px-2 py rounded-full":
                      no === pageIndex,
                  })}
                  onClick={() => gotoPage(no)}
                >
                  {no + 1}
                </div>
              );
            }
            if (no + 1 === pageOptions.length) {
              return (
                <div
                  key={no}
                  className={classNames("cursor-pointer", {
                    "bg-theme-main text-white px-2 py rounded-full":
                      no === pageIndex,
                  })}
                  onClick={() => gotoPage(no)}
                >
                  {no + 1}
                </div>
              );
            }
            return "";
          })}
          <div
            className={classNames(
              {
                "cursor-pointer": canNextPage,
              },
              {
                "text-theme-icon-color cursor-not-allowed": !canNextPage,
              }
            )}
            onClick={() => {
              if (canNextPage) {
                nextPage();
              }
            }}
          >
            Next
          </div>
          <select
            className="focus:outline-none"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[1, 2, 3, 4, 5, 10, 20, 30, 40, 50].map((pageSize1) => (
              <option key={pageSize1} value={pageSize1}>
                {pageSize1}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default Table;

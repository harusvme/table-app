import React, { useState, useMemo } from "react";
import { useGetSpacecraftsQuery } from "../../api/api";
import styles from "./Table.module.scss";

const Table: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: string;
    } | null>(null);
    const [filterConfig, setFilterConfig] = useState<{
        [key: string]: string | null;
    }>({
        name: "",
        registry: "",
        status: "",
        dateStatus: "",
    });
    const { data, isLoading } = useGetSpacecraftsQuery();

    const filteredItems = useMemo(() => {
        if (!data) return [];
        let filteredData = [...data.spacecrafts];

        for (const columnName in filterConfig) {
            if (filterConfig[columnName]) {
                filteredData = filteredData.filter((item: any) => {
                    const columnValue = item[columnName];
                    if (columnValue !== null && columnValue !== undefined) {
                        return columnValue
                            .toLowerCase()
                            .includes(filterConfig[columnName]?.toLowerCase());
                    }
                    return false;
                });
            }
        }

        if (sortConfig !== null) {
            filteredData.sort((a: any, b: any) => {
                const valueA =
                    a[sortConfig.key] === null ? "" : a[sortConfig.key];
                const valueB =
                    b[sortConfig.key] === null ? "" : b[sortConfig.key];
                if (valueA < valueB) {
                    return sortConfig.direction === "asc" ? -1 : 1;
                }
                if (valueA > valueB) {
                    return sortConfig.direction === "asc" ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredData;
    }, [data, sortConfig, filterConfig]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const requestSort = (key: string) => {
        let direction = "asc";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        columnName: string
    ) => {
        const value = e.target.value;
        if (
            filterConfig[columnName] !== null &&
            filterConfig[columnName] !== undefined
        ) {
            setFilterConfig((prevConfig) => ({
                ...prevConfig,
                [columnName]: value,
            }));
        }
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data || !data.spacecrafts.length) {
        return <div>No data available.</div>;
    }

    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <div>
            <table className={styles["table-container"]}>
                <thead>
                    <tr>
                        <th onClick={() => requestSort("name")}>Name</th>
                        <th onClick={() => requestSort("registry")}>
                            Registry
                        </th>
                        <th onClick={() => requestSort("status")}>Status</th>
                        <th onClick={() => requestSort("dateStatus")}>
                            Date Status
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input
                                type="text"
                                value={filterConfig.name || ""}
                                onChange={(e) => handleFilterChange(e, "name")}
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                value={filterConfig.registry || ""}
                                onChange={(e) =>
                                    handleFilterChange(e, "registry")
                                }
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                value={filterConfig.status || ""}
                                onChange={(e) =>
                                    handleFilterChange(e, "status")
                                }
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                value={filterConfig.dateStatus || ""}
                                onChange={(e) =>
                                    handleFilterChange(e, "dateStatus")
                                }
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item: any, index: number) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.registry}</td>
                            <td>{item.status}</td>
                            <td>{item.dateStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {pageNumbers.map((number) => (
                    <div
                        key={number}
                        onClick={() => paginate(number)}
                        className={`${styles["page-link"]} ${
                            currentPage === number ? styles.active : ""
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Table;

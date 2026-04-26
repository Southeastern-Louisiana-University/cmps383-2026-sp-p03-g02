import {useEffect, useState} from "react";
import { Card, Text, Button, Group, SimpleGrid } from '@mantine/core';
import type { TableGetDto } from "../types";
import { useParams } from "react-router-dom"

const Reservations = () => { 
  const [tables, setTables] = useState<TableGetDto[]>([]);
  const { locationId } = useParams();
  const selectedLocationId = Number(locationId);

  function Occupied({ isReserved }: { isReserved: boolean }) {
    if (isReserved) {
      return <Text>Reserved</Text>;
    } 
    return <Text>Open</Text>;
  }

    const getColor = (table: TableGetDto) => {
    if (table.isReserved) {
      return "#EF9A9A";
    }
    return "#A5D6A7";
  };

  const reserveTable = async (id: string | number) => {
    await fetch(`/api/tables/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isReserved: true }),
    });

    updateTableState(id, { isReserved: true });
  };

  const updateTableState = (id: string | number, updates: Partial<TableGetDto>) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === id ? { ...table, ...updates } : table
      )
    );
  };

  const displayedTables = tables.filter(
    (table) => table.locationId === selectedLocationId
  )

    useEffect(() => {
        fetch("/api/tables")
        .then((res) => res.json())
        .then((res) => {
        setTables(res)
        });
  }, [])

  return (
    <div>
        <h1>Reservations</h1>
        <SimpleGrid cols={4}>
            {displayedTables.map((table) => {
                const isOpen = !table.isReserved

                return ( 
                    <Card 
                    shadow="sm" 
                    padding="lg" 
                    radius="md" 
                    withBorder 
                    m="sm" 
                    p="md"
                    style={{
                        backgroundColor: getColor(table),
                        textAlign: "center",
                        cursor: "pointer"
                    }}>
                        <Text>Table</Text>
                        <Occupied 
                            isReserved={table.isReserved}
                        />

                        {isOpen && (
                            <Group mt="md" justify="center">
                                <Button 
                                    size="xs" 
                                    color="yellow"
                                    onClick={() => reserveTable(table.id)}>
                                    Reserve
                                </Button>
                            </Group>
                        )}
                    </Card>
                )
            })}
        </SimpleGrid>
    </div>
  );
}

export default Reservations;
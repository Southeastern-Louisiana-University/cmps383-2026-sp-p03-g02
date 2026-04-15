import {useEffect, useState} from "react";
import { Card, Image, Text, Badge, Button, Group, SimpleGrid, AspectRatio, Box, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface Table {
  id: string | number;
  isOccupied: boolean;
  isReserved: boolean;
}
const Reservations = () => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  
  const [tables, setTables] = useState<Table[]>([]);

  function Occupied({isOccupied, isReserved}) {
    if(isOccupied) {
        return <Text>Occupied</Text>
    }
    if(isReserved) {
        return <Text>Reserved</Text>
    }
    return <Text>Open</Text>
  }

  const getColor = (table) => {
    if(table.isOccupied){
        return "#EF9A9A";
    }
    if(table.isReserved){
        return "#FFE082"
    }
    return "#A5D6A7"
  }

  const reserveTable = async (id) => {
  await fetch(`/api/tables/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isReserved: true,
      isOccupied: false,
    }),
  });

  updateTableState(id, { isReserved: true });
};


const occupyTable = async (id) => {
  await fetch(`/api/tables/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isReserved: false,
      isOccupied: true,
    }),
  });

  updateTableState(id, { isOccupied: true });
};

const updateTableState = (id: string | number, updates: Partial<Table>) => {
  setTables((prev) =>
    prev.map((table) =>
      table.id === id ? { ...table, ...updates } : table
    )
  );
};

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
            {tables.map((table) => {
                const isOpen = !table.isOccupied && !table.isReserved

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
                            isOccupied={table.isOccupied}
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
                                <Button 
                                    size="xs" 
                                    color="red"
                                    onClick={() => occupyTable(table.id)}>
                                    Claim
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
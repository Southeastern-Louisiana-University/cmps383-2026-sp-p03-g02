import {useEffect, useState} from "react";
import { Card, Text, Button, Group, SimpleGrid } from '@mantine/core';
import type { TableGetDto, LocationGetDto } from "../types";
import { useParams } from "react-router-dom"

const Reservations = () => { 
  const [tables, setTables] = useState<TableGetDto[]>([]);
  const { locationId } = useParams();
  const [locations, setLocations] = useState<LocationGetDto[]>([]);
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

  const displayedTables = tables.filter(
    (table) => table.locationId === selectedLocationId
  )

    useEffect(() => {
        fetch("/api/tables")
        .then((res) => res.json())
        .then((res) => {
        setTables(res)
        });

        fetch("/api/locations")
        .then((res) => res.json())
        .then((res) => {
        setLocations(res)        
    })
  }, [])

  const location = locations.find((t) => t.id === Number(locationId))

  return (
    <div>
        <h1>{location?.address}</h1>
        <SimpleGrid cols={5}>
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
                        <Text>Capacity: {table.capacity}</Text>
                        <Occupied 
                            isReserved={table.isReserved}
                        />

                        {/* {isOpen && (
                            <Group mt="md" justify="center">
                                <Button 
                                    size="xs" 
                                    color="yellow"
                                    onClick={() => reserveTable(table)}>
                                    Reserve
                                </Button>
                            </Group>
                        )} */}
                    </Card>
                )
            })}
        </SimpleGrid>
    </div>
  );
}

export default Reservations;
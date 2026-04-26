import {useEffect, useState} from "react";
import { Card, Text, Button, SimpleGrid, Stack, Title } from '@mantine/core';
import type { TableGetDto, LocationGetDto } from "../types";
import { useNavigate } from "react-router-dom"

const Locations = () => { 
  const [tables, setTables] = useState<TableGetDto[]>([]);
  const [locations, setLocations] = useState<LocationGetDto[]>([]);
  const navigate = useNavigate();

  const getLocationStats = (locationId: number) => {
    const locationTables = tables.filter(
      (table) => table.locationId === locationId
    )

    return {
      total: locationTables.length,
      reserved: locationTables.filter((t) => t.isReserved).length,
      open: locationTables.filter((t) => !t.isReserved).length,
    }
  }

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
        });
  }, [])

return (
    <div>
    <h1>Locations</h1>
    <SimpleGrid cols={3}>
        {locations.map((location) => {
        const stats = getLocationStats(location.id);

        return (
            <Card key={location.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="sm">
                <Title order={3}>{location.name}</Title>
                <Text>Total Tables: {stats.total}</Text>
                <Text c="green">Open: {stats.open}</Text>
                <Text c="red">Reserved: {stats.reserved}</Text>
                <Button onClick={() => {
                navigate(`/locations/${location.id}`)
                }}>
                View Tables
                </Button>
            </Stack>
            </Card>
        )
        })}
    </SimpleGrid>
    </div>
)
}


export default Locations;
import { View, Text, FlatList, StyleSheet } from "react-native";

const sampleOrders = [
  {
    id: 101,
    userName: "bob",
    createdAt: "2026-04-26T22:27:00",
    location: "Main St",
    pickupType: "Pickup",
    total: 795,
    items: [{ name: "Supernova", modifications: "" }],
  },
  {
    id: 102,
    userName: "bob",
    createdAt: "2026-04-26T22:26:00",
    location: "Oak Ave",
    table: "Table 13",
    total: 2195,
    items: [
      { name: "Supernova", modifications: "Soy Milk" },
      { name: "Travis Special", modifications: "Everything Bagel Seasoning" },
    ],
  },
];

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageHeaderText}>Orders</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.subtitle}>
          Here is where you will find your order details:
        </Text>

        <FlatList
          data={sampleOrders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.topRow}>
                <Text style={styles.username}>{item.userName}</Text>

                <Text style={styles.dateBadge}>
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  {new Date(item.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Text>
              </View>

              <View style={styles.badgeRow}>
                <Text style={styles.locationBadge}>{item.location}</Text>

                <Text style={styles.purpleBadge}>
                  {item.table ?? item.pickupType}
                </Text>

                <Text style={styles.priceBadge}>
                  ${(item.total / 100).toFixed(2)}
                </Text>
              </View>

              <Text style={styles.itemsHeader}>Items:</Text>

              {item.items.map((orderItem, index) => (
                <Text key={index} style={styles.itemText}>
                  {orderItem.name}
                  {orderItem.modifications ? (
                    <Text style={styles.modification}>
                      {" "}
                      — {orderItem.modifications}
                    </Text>
                  ) : null}
                </Text>
              ))}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  pageHeader: {
    backgroundColor: "#d8c6a7",
    paddingTop: 45,
    paddingBottom: 14,
    alignItems: "center",
  },

  pageHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  username: {
    fontSize: 16,
  },
dateBadge: {
    backgroundColor: "#8f969e",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: "hidden",
    textTransform: "uppercase",
  },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  locationBadge: {
    backgroundColor: "#12b886",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    overflow: "hidden",
    textTransform: "uppercase",
  },

  purpleBadge: {
    backgroundColor: "#7950f2",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    overflow: "hidden",
    textTransform: "uppercase",
  },

  priceBadge: {
    backgroundColor: "#1c7ed6",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    overflow: "hidden",
  },

  itemsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 18,
  },

  itemText: {
    fontSize: 16,
    marginBottom: 24,
  },

  modification: {
    fontStyle: "italic",
  },
});
import React, { FC, useMemo, memo } from "react";
import { View, Text, Image } from "react-native";
import { getStyle } from "./styles";
import { eventItem } from "../../views/mainView";

interface Props {
    item: eventItem;
}

export const EventItem: FC<Props> = memo(({ item }: Props) => {
    const styles = useMemo(() => getStyle(), []);

    const readableTime = (createdAt: string): string => {
        const date = new Date(createdAt);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={{ uri: item.actor.avatar_url }} />
            <View style={styles.infoWrapper}>
                <View>
                    <Text numberOfLines={1} style={styles.infoText}>User id: <Text style={{ color: "#07498f" }}>{item.actor.id}</Text></Text>
                    <Text numberOfLines={1} style={styles.infoText}>Login: <Text style={{ color: "#07498f" }}>{item.actor.login}</Text></Text>
                    <Text numberOfLines={1} style={styles.infoText}>Repo name: <Text style={{ color: "#07498f" }}>{item.repo.name}</Text></Text>
                </View>
                <Text numberOfLines={1} style={styles.dateText}>{readableTime(item.created_at || "")}</Text>
            </View>
        </View>
    );
});

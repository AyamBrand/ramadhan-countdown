import { useState } from "react";
import { Text, View, Pressable, Modal, ScrollView } from "react-native";
import { useTranslation } from "@/hooks/use-translation";
import { useColors } from "@/hooks/use-colors";
import { Ionicons } from "@expo/vector-icons";

export function AboutSection() {
  const t = useTranslation();
  const colors = useColors();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* About Section Card with clickable area */}
      <Pressable
        onPress={() => setShowModal(true)}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <View className="bg-surface rounded-2xl p-4 mb-4 border border-border">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground">
                {t("settings.about")}
              </Text>
            </View>
            <Text
              className="text-sm font-medium"
              style={{ color: colors.primary }}
            >
              {t("settings.seeMore")} →
            </Text>
          </View>
        </View>
      </Pressable>

      {/* Modal for About content */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          className="flex-1 bg-background"
          style={{ paddingTop: 50, paddingBottom: 20 }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-4 mb-4">
            <Text className="text-xl font-bold text-foreground">
              {t("settings.about")}
            </Text>
            <Pressable
              onPress={() => setShowModal(false)}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons name="close" size={24} color={colors.foreground} />
            </Pressable>
          </View>

          {/* Content */}
          <ScrollView className="flex-1 px-4">
            <Text
              className="text-sm text-foreground leading-relaxed"
              style={{ lineHeight: 24 }}
            >
              {t("settings.aboutText")}
            </Text>
          </ScrollView>

          {/* Close Button */}
          <Pressable
            onPress={() => setShowModal(false)}
            className="mx-4 bg-primary rounded-lg py-3 items-center"
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-background font-semibold">
              {t("settings.close")}
            </Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

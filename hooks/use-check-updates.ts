import { useState, useCallback } from "react";
import * as Updates from "expo-updates";

export interface UpdateCheckResult {
  isAvailable: boolean;
  message: string;
  error?: string;
}

export function useCheckUpdates() {
  const [isChecking, setIsChecking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const checkForUpdates = useCallback(async (): Promise<UpdateCheckResult> => {
    try {
      setIsChecking(true);

      // Check if updates are enabled
      if (!Updates.isEnabled) {
        return {
          isAvailable: false,
          message: "Updates are not enabled in this build",
        };
      }

      // Check for available updates
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        // Download the update
        setIsDownloading(true);
        await Updates.fetchUpdateAsync();
        setIsDownloading(false);

        // Reload to apply the update
        setIsInstalling(true);
        await Updates.reloadAsync();
        setIsInstalling(false);

        return {
          isAvailable: true,
          message: "Update downloaded and will be applied on next app restart",
        };
      } else {
        return {
          isAvailable: false,
          message: "You are already using the latest version",
        };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return {
        isAvailable: false,
        message: "Error checking for updates",
        error: errorMessage,
      };
    } finally {
      setIsChecking(false);
      setIsDownloading(false);
      setIsInstalling(false);
    }
  }, []);

  return {
    checkForUpdates,
    isChecking,
    isDownloading,
    isInstalling,
  };
}
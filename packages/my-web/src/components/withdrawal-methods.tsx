"use client";

import { Dictionary } from "@/dictionaries";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@tekminewe/mint-ui/tabs";
import { ReactNode } from "react";

export const WithdrawalMethods = ({
  bankTransfer,
  dictionary,
}: {
  bankTransfer: ReactNode;
  dictionary: {
    tabs: Dictionary["withdrawal"]["tabs"];
  };
}) => {
  return (
    <Tabs defaultValue="bankTransfer">
      <TabsList>
        <TabsTrigger value="bankTransfer">
          {dictionary.tabs.bankTransfer}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bankTransfer">{bankTransfer}</TabsContent>
    </Tabs>
  );
};

"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@tekminewe/mint-ui/tabs";
import { MyClicksTable } from "./my-clicks-table";
import { MyCashbacksTable } from "./my-cashbacks-table";
import { Dictionary } from "@/dictionaries";
import { MyWithdrawalsTable } from "./my-withdrawals-table";

export const DashboardTabs = ({
  dictionary,
  locale,
}: {
  locale: string;
  dictionary: {
    common: {
      error: {
        title: string;
        message: string;
      };
    };
    myClicks: Dictionary["dashboard"]["myClicks"];
    myCashbacks: Dictionary["dashboard"]["myCashbacks"];
    myWithdrawals: Dictionary["dashboard"]["myWithdrawals"];
    tabs: Dictionary["dashboard"]["tabs"];
  };
}) => {
  return (
    <Tabs defaultValue="cashback">
      <TabsList>
        <TabsTrigger value="cashback">
          {dictionary.tabs.cashbackHistory}
        </TabsTrigger>
        <TabsTrigger value="myClicks">{dictionary.tabs.myClicks}</TabsTrigger>
        <TabsTrigger value="myWithdrawals">
          {dictionary.tabs.myWithdrawals}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cashback">
        <MyCashbacksTable
          language={locale}
          dictionary={{
            common: {
              error: dictionary.common.error,
            },
            myCashbacks: dictionary.myCashbacks,
          }}
        />
      </TabsContent>
      <TabsContent value="myClicks">
        <MyClicksTable
          language={locale}
          dictionary={{
            common: {
              error: dictionary.common.error,
            },
            myClicks: dictionary.myClicks,
          }}
        />
      </TabsContent>
      <TabsContent value="myWithdrawals">
        <MyWithdrawalsTable
          locale={locale}
          dictionary={{
            common: {
              error: dictionary.common.error,
            },
            myWithdrawals: dictionary.myWithdrawals,
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

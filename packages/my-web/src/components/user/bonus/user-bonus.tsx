'use client';

import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { GET_MY_BONUSES } from '@/graphql/bonus/user-bonus-queries';
import {
  GetMyBonusesQuery,
  BonusEligibilityStatusEnum,
} from '@/services/graphql';
import { Card } from '@tekminewe/mint-ui/card';
import { Badge } from '@tekminewe/mint-ui/badge';
import { Button } from '@tekminewe/mint-ui/button';
import { Callout } from '@tekminewe/mint-ui/callout';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@tekminewe/mint-ui/tabs';
import { BonusDetailsModal } from './bonus-details-modal';
import { BonusTransactionTable } from './bonus-transaction-table';
import { useState } from 'react';

interface UserBonusProps {
  /**
   * Dictionary for translations
   * @example { user: { title: "My Bonuses", myBonuses: "My Bonuses" } }
   */
  dictionary: any;
  /**
   * Language code for localization
   * @example "en"
   */
  lang: string;
}

export const UserBonus = ({ dictionary, lang }: UserBonusProps) => {
  const session = useSession();
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<any>(null);

  const { data: myBonusesData, loading: loadingMyBonuses } =
    useQuery<GetMyBonusesQuery>(GET_MY_BONUSES, {
      context: {
        headers: {
          'Accept-Language': lang,
          Authorization: `Bearer ${session?.data?.accessToken}`,
        },
      },
      skip: !session?.data?.accessToken, // Skip query if not authenticated
      onError: () => setIsError(true),
      fetchPolicy: 'cache-and-network', // Ensure fresh data for user bonuses
    });

  // Show loading state
  if (loadingMyBonuses) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-600 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-neutral-200 dark:bg-neutral-600 rounded w-1/2 mb-4"></div>
              <div className="h-2 bg-neutral-200 dark:bg-neutral-600 rounded w-full"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <Card className="p-6">
        <Callout type="error" className="mb-4">
          <p>{dictionary?.user?.bonusErrorMessage}</p>
        </Callout>
      </Card>
    );
  }

  // Show authentication required state
  if (!session?.data?.accessToken) {
    return (
      <Card className="p-6">
        <Callout type="warning" className="mb-4">
          <p>{dictionary?.user?.signInRequired}</p>
        </Callout>
      </Card>
    );
  }

  const myBonuses = myBonusesData?.myBonuses || [];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="eligible" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="eligible">
            {dictionary?.user?.eligibleBonuses || 'Eligible Bonuses'}
            <Badge variant="outline" className="ml-2">
              {myBonuses.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="history">
            {dictionary?.user?.bonusHistory || 'Bonus History'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="eligible" className="mt-6">
          {myBonuses.length === 0 ? (
            <Card className="p-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                  {dictionary?.user?.noBonuses ||
                    "You don't have any bonuses yet"}
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {myBonuses.map((bonus: any) => (
                <Card
                  key={bonus.id}
                  className="flex items-center gap-4 p-4 hover:shadow-sm transition-all duration-200 cursor-pointer"
                >
                  {/* Logo/Icon on the left */}
                  <div className="flex-shrink-0">
                    {bonus.bonusType?.metadata?.logo?.url ? (
                      <img
                        src={bonus.bonusType.metadata.logo.url}
                        alt={bonus.bonusType.metadata.title || 'Bonus Logo'}
                        className="w-12 h-12 rounded-lg object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 2 0 002 2h10a2 2 0 002-2v-7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content in the middle */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-neutral-900 dark:text-white truncate">
                        {bonus.bonusType?.metadata?.title ||
                          `${
                            dictionary?.user?.bonusLabel
                          } #${bonus.bonusTypeId.slice(-8)}`}
                      </h3>
                    </div>
                  </div>

                  {/* View button on the right */}
                  <div className="flex-shrink-0">
                    <Button
                      variant="solid"
                      size="sm"
                      onClick={() => {
                        setSelectedBonus(bonus);
                        setIsModalOpen(true);
                      }}
                      disabled={
                        bonus.statusId === BonusEligibilityStatusEnum.Expired
                      }
                    >
                      {dictionary?.user?.viewLabel}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <BonusTransactionTable dictionary={dictionary} lang={lang} />
        </TabsContent>
      </Tabs>

      {/* Bonus Details Modal */}
      <BonusDetailsModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        bonus={selectedBonus}
        dictionary={dictionary}
      />
    </div>
  );
}; // Helper function for bonus status display
const getBonusStatusDisplayName = (
  statusId: BonusEligibilityStatusEnum,
  dictionary?: any,
): string => {
  switch (statusId) {
    case BonusEligibilityStatusEnum.Available:
      return dictionary?.user?.bonusStatusAvailable;
    case BonusEligibilityStatusEnum.Used:
      return dictionary?.user?.bonusStatusUsed;
    case BonusEligibilityStatusEnum.Expired:
      return dictionary?.user?.bonusStatusExpired;
    default:
      return dictionary?.user?.bonusStatusUnknown;
  }
};

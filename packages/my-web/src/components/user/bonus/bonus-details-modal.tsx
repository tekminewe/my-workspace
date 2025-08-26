'use client';

import { Dialog, DialogRoot, DialogClose } from '@tekminewe/mint-ui/dialog';
import { Badge } from '@tekminewe/mint-ui/badge';
import { RichTextPreviewPlain } from '@tekminewe/mint-ui/rich-text-preview';
import { LuX } from 'react-icons/lu';
import { format } from 'date-fns';
import { BonusEligibilityStatusEnum } from '@/services/graphql';

interface BonusDetailsModalProps {
  /**
   * Whether the modal is open
   * @example true
   */
  isOpen: boolean;
  /**
   * Function to close the modal
   * @example () => setIsOpen(false)
   */
  onClose: (open: boolean) => void;
  /**
   * The bonus data to display
   * @example { bonusType: { metadata: { title: "2x First Cashback", description: "..." } } }
   */
  bonus: any;
  /**
   * Dictionary for translations
   * @example { user: { closeLabel: "Close", descriptionLabel: "Description" } }
   */
  dictionary: any;
}

export const BonusDetailsModal = ({
  isOpen,
  onClose,
  bonus,
  dictionary,
}: BonusDetailsModalProps) => {
  if (!bonus) return null;

  const getStatusBadgeVariant = (statusId: BonusEligibilityStatusEnum) => {
    switch (statusId) {
      case BonusEligibilityStatusEnum.Available:
        return 'solid';
      case BonusEligibilityStatusEnum.Used:
        return 'soft';
      default:
        return 'outline';
    }
  };

  const getStatusDisplayName = (statusId: BonusEligibilityStatusEnum) => {
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

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <Dialog>
        <div className="overflow-y-auto space-y-4 md:space-y-6">
          {/* Hero Section with Featured Image and Title Overlay */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
            {bonus.bonusType?.metadata?.featuredImage?.url ? (
              <img
                src={bonus.bonusType.metadata.featuredImage.url}
                alt={bonus.bonusType.metadata.title || 'Bonus Featured Image'}
                className="w-full h-full object-cover absolute"
              />
            ) : (
              // Fallback gradient background if no image
              <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 absolute" />
            )}

            {/* Close button positioned at top-right of image */}
            <DialogClose className="absolute right-3 top-3 z-20 rounded-full bg-black/20 backdrop-blur-sm p-2 opacity-80 hover:opacity-100 hover:bg-black/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent">
              <LuX className="h-4 w-4 text-white drop-shadow-sm" />
              <span className="sr-only">{dictionary?.user?.closeLabel}</span>
            </DialogClose>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/30 z-0">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-shadow-lg">
                      {bonus.bonusType?.metadata?.title ||
                        `${dictionary?.user?.bonusLabel} #${
                          bonus.bonusTypeId?.slice(-8) || ''
                        }`}
                    </h1>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge
                        variant={getStatusBadgeVariant(bonus.statusId)}
                        className="text-white border-white/30 bg-white/20 backdrop-blur-sm"
                      >
                        {getStatusDisplayName(bonus.statusId)}
                      </Badge>
                      {bonus.expiresAt &&
                        bonus.bonusType?.codeId !==
                          'FirstCashbackMultiplier' && (
                          <span className="text-sm text-white/90 font-medium">
                            {dictionary?.user?.expiresLabel}:{' '}
                            {format(new Date(bonus.expiresAt), 'MMM dd, yyyy')}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {bonus.bonusType?.metadata?.description && (
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                {dictionary?.user?.descriptionLabel}
              </h3>
              <RichTextPreviewPlain
                content={
                  typeof bonus.bonusType.metadata.description === 'string'
                    ? JSON.parse(bonus.bonusType.metadata.description)
                    : bonus.bonusType.metadata.description
                }
              />
            </div>
          )}

          {/* Terms and Conditions */}
          {bonus.bonusType?.metadata?.termsAndConditions && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {dictionary?.user?.termsLabel}
              </h3>
              <RichTextPreviewPlain
                content={
                  typeof bonus.bonusType.metadata.termsAndConditions ===
                  'string'
                    ? JSON.parse(bonus.bonusType.metadata.termsAndConditions)
                    : bonus.bonusType.metadata.termsAndConditions
                }
              />
            </div>
          )}

          {/* Additional Details */}
          {bonus.expiresAt && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {dictionary?.user?.importantInfoLabel}
              </h3>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p>
                  <span className="font-medium">
                    {dictionary?.user?.expiryLabel}:
                  </span>{' '}
                  {format(
                    new Date(bonus.expiresAt),
                    "EEEE, MMMM dd, yyyy 'at' h:mm a",
                  )}
                </p>
                <p className="mt-2 text-xs opacity-75">
                  {dictionary?.user?.expiryNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </DialogRoot>
  );
};

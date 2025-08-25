import { Dictionary } from "@/dictionaries";
import { useCreateUserWithdrawal } from "@/hooks/use-create-user-withdrawal";
import { logError } from "@/services/error";
import { formatCurrency } from "@/utils/currency";
import { replaceTokens } from "@/utils/string";
import { ControlledForm } from "@tekminewe/mint-ui/form";
import { ControlledTextInput } from "@tekminewe/mint-ui/text-input";
import { toast } from "@tekminewe/mint-ui/toast";
import { SubmitHandler } from "react-hook-form";
import { coerce, object, string } from "zod";

interface WithdrawalFormState {
  userPaymentMethodId: string;
  userWalletId: string;
  amount: number;
}

export const WithdrawalForm = ({
  userPaymentMethodId,
  userWalletId,
  minAmount,
  locale,
  dictionary,
}: {
  userPaymentMethodId: string;
  userWalletId: string;
  minAmount: number;
  locale: string;
  dictionary: Dictionary["withdrawal"]["withdrawalForm"];
}) => {
  const { trigger } = useCreateUserWithdrawal();
  const handleSubmit: SubmitHandler<WithdrawalFormState> = async (data) => {
    const result = await trigger({
      userPaymentMethodId: data.userPaymentMethodId,
      userWalletId: data.userWalletId,
      amount: data.amount,
    });

    if (!result.ok()) {
      logError(new Error(result.error.message));
      toast(
        dictionary.error[
          result.error?.message as keyof typeof dictionary.error
        ] ?? dictionary.error.unknownError,
        {
          type: "error",
        }
      );
      throw new Error(result.error.message);
    }

    toast(dictionary.success, {
      type: "success",
    });
  };
  const minWithdrawal = formatCurrency({
    amount: minAmount,
    locale: locale,
    currency: "MYR",
  });

  return (
    <ControlledForm<WithdrawalFormState>
      className="max-w-[375px]"
      defaultValues={{
        userPaymentMethodId,
        userWalletId,
        amount: 0,
      }}
      schema={object({
        userPaymentMethodId: string().min(1, "Please select a payment method"),
        userWalletId: string().min(1, "Please select a wallet"),
        amount: coerce.number().min(
          minAmount,
          replaceTokens(dictionary.amountMinimumError, {
            amount: minWithdrawal,
          })
        ),
      })}
      onSubmit={handleSubmit}
      submitButtonLabel={dictionary.submitLabel}
    >
      <ControlledTextInput
        description={replaceTokens(dictionary.amountDescription, {
          amount: minWithdrawal,
        })}
        type="currency"
        name="amount"
        label={dictionary.amountLabel}
      />
    </ControlledForm>
  );
};

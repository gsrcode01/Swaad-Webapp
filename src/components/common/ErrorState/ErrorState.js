import React from "react";
import Button from "../Button/Button";
import { InfoIcon } from "../Icons/Icons";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the requested data right now.",
  onRetry,
}) => {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-[#FFF8F1] border border-[#E94B2F]/30 text-[#E94B2F] flex items-center justify-center mx-auto mb-4 shadow-sm">
        <InfoIcon className="w-8 h-8 text-[#E94B2F]" />
      </div>
      <h2 className="text-xl font-headline text-[#E94B2F] mb-2">{title}</h2>
      <p className="text-xs text-[#667085] mb-6 leading-relaxed font-body">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;

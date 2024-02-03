import { ReactNode } from "react";
import Loader from "../loader/loader";

type LoaderWithConditionProps = {
  isLoading: boolean; 
  error: string | boolean;
  completed: boolean | null;
  children: ReactNode;
}

export default function LoaderWithCondition({ isLoading, error, completed, children }: LoaderWithConditionProps) {
  return (
    <>
      {isLoading && (<Loader />)}
      {error && (<h3 className="text text_type_main-medium">Произошла ошибка</h3>)}
      {completed && (
        <>
          {children}
        </>
      )}
    </>
  );
}
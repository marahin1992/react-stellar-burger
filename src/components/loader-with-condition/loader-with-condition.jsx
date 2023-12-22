import Loader from "../loader/loader";

export default function LoaderWithCondition({ isLoading, error, completed, children }) {
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
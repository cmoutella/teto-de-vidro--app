import Button from "../../button";

const InvitationsInput = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <p className="text-lg font-medium text-brand-primary-600 w-">
          Convite alguém para colaborar nessa busca
        </p>
        <Button rounded={true} label="+" uiType="outline" theme="primary" />
      </div>

      <div className="h-0.5 bg-brand-primary-500 my-1 w-full"></div>

      <div className="w-full">{/* campos de input (nome + email) * n  */}</div>
    </div>
  );
};

export default InvitationsInput;

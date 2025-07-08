// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, title, value,onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" hover:shadow-md transition card bg-base-100 shadow-sm"
    >
      <div className="">
        <div className="card-body p-4">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;

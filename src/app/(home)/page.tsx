import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="min-h-screen px-2 ">
      {/* <Button variant={'default'}>sdfsf</Button> */}
      <section className="section1 flex flex-col h-[80vh]">
        <div className=" flex md:w-3/2 w-full h-full flex-col gap-1 mt-4 md:mt-10">
          <div className="md:px-2 px-0">
            <p className="md:text-7xl text-7xl font-semibold text-primary/80 md:text-muted">
              Onboard Employees 10x Faster
            </p>
            <p className="md:text-7xl md:px-0 px-4 text-sm  font-semibold ">
              Focuses on outcomes
            </p>
            {/* <p className='md:text-5xl text-sm  font-semibold text-primary'>Focuses on outcomes</p> */}
          </div>
          <div className="flex md:w-fit px-2 rounded-full w-full items-center justify-between md:p-0 p-1 md:px-2 border mt-6 focus-within:ring-1  focus-within:ring-primary/10 transition">
            <input
              type="text"
              placeholder="Enter your work email"
              className="flex-1 p-2  md:p-4 w-full md:text-lg text-sm outline-none"
            />
            <Button
              variant={"secondary"}
              className="md:w-42  text-xs w-fit  py-6"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
      <section className="h-screen bg-white   ">

      </section>
    </div>
  );
};

export default page;

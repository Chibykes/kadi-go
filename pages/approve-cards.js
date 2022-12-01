import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { CgEditFlipH } from 'react-icons/cg';
import ReactCardFlip from 'react-card-flip';

export default function Home() {

  const router = useRouter();
  const {trackingID} = router.query;
  const [cards, setCards] = useState([]);

  const cardOrder = [
    {stage: "Processing Request", desc: "Your request has been recieved and is awaiting approval after all checks has been done"},
    {stage: "Printing Card", desc: "Your card is ready to be printed"},
    {stage: "Packaged for delivery", desc: "Your card has been packaged and ready for next phase"},
    {stage: "Card sent for delivery", desc: "Your card has been sent for delivery"},
    {stage: "Card Arrived", desc: ""}
  ];

  const handleUpgrade = (trackingID) => {

    let updatedCards = cards.map(c => {
      if(c.trackingID === trackingID){
        c.stage += 1;
      }

      return c;
    });

    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));

  }


  useEffect(() => {
    setCards(JSON.parse(localStorage.getItem('cards')) || []);
  }, [])

  return (
    <div>
      <Head>
        <title>Approve Cards - Kadi-go</title>
        <meta name="description" content="Generated by create next app" />
      </Head>


      {/* <div className='fixed w-full h-full bg-app-primary'></div> */}
      <main className="relative w-full p-4 max-w-sm mx-auto space-y-4 z-100 backdrop-blur-2xl isolate flex flex-col items-center">

      <p className='py-1 flex gap-3 items-center text-lg font-bold'>
        Approve Cards
      </p>

      { cards.map(({ fullname, bank, trackingID, stage },index) => (
        <div key={index} className='bg-neutral-50 p-4 w-full rounded-lg'>
          <div className='space-y-4'>
            <div className='flex gap-4 items-center'>

              <div className=''>
                <div className='relative w-8 h-8 rounded-full overflow-hidden'>
                  <Image src={`/img/banks/${bank?.logo}`} layout="fill" objectFit="cover" />
                </div>
              </div>

              <div className=''>
                <p className='font-bold'>{`${trackingID?.substr(0,4)}-${trackingID?.substr(4,4)}-${trackingID?.substr(8,4)}`}</p>
                <p className='text-sm'>{fullname}</p>
                <p className='text-sm'><strong>Stage: </strong>{cardOrder[stage-1].stage}</p>

              </div>

            </div>

            {stage < 5 ? 
              <p onClick={() => handleUpgrade(trackingID, stage+1)} className='cursor-pointer font-bold text-xs text-center p-2 bg-purple-50 text-purple-500 rounded-md'>Update to Next Stage</p>:
              <p className='cursor-pointer font-bold text-xs text-center p-2 bg-green-50 text-green-500 rounded-md'>Completed</p>
            }
          </div>
          
        </div>
      ))}

      </main>

    </div>
  )
}

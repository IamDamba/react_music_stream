import React, { useState, useEffect } from "react";
import "../../../styles/main/licences/licences.scss";
import Accordion from "../../../components/accordion/Accordion";

const Licences = () => {
  // Variables
  const [active, setActive] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  //Function
  useEffect(() => {
    //Scroll To Top
    window.scrollTo(0, 0);
    setCanScroll(true);
  }, [!canScroll]);

  return (
    <main className="licences">
      <div className="content">
        <div className="content_header">
          <h1>Licencing Methods</h1>
          <h2>
            Here are all the licencing methods we provides to all of you, just
            choose wich one will fit you best.
          </h2>
          <div className="licences_list">
            <Accordion
              title="Non-Exclusive Contract"
              text={`THIS LICENCE AGREEMENT is made on Friday 15th of October 2021 ("Effective Date") by and between Kim Doe (hereinafter referred to as the "Licensee") also, if applicable, professionally known as Kim Doe, whose principle address is Kim Doe address, France, and John Doe (hereinafter referred to as the "Licensor") also, if applicable, professionally known as DJ John Doe, whose principle address is Appt 15, rue bidon, 75000 Paris, Ile de France, France. Licensor warrants that it controls the mechanical rights in and to the copyrighted musical works entitled Track ("Composition") as of and prior to the date first written above. The Composition, including the music thereof, was composed by John Doe ("Songwriter") managed under the Licensor.

              Master Use. The Licensor hereby grants to License a non-exclusive license (this "License") to record vocal synchronization to the Composition partly or in its entirety and substantially in its original form ("Master Recording").
              
              Mechanical Rights. The Licensor hereby grants to Licensee a non-exclusive license to use Master Recording in the reproduction, duplication, manufacture, and distribution of phonograph records, cassette tapes, compact disk, digital downloads, other miscellaneous audio and digital recordings, and any lifts and versions thereof (collectively, the "Recordings", and individually, a "Recordings") worldwide for up to the pressing or selling a total of 3000 copies of such Recordings or any combination of such Recordings, condition upon the payment to the Licensor a sum of $24.44 US dollars, receipt of which is confirmed.
              
              Performance Rights. The Licensor here by grants to Licensee a non-exclusive license to use the Master Recording in unlimited non-profit performances, shows, or concerts. Licensee may not receive compensation from performances with this license.
              
              Synchronization Rights. The Licensor hereby grants limited synchronization rights for one (1) music video streamed online (Youtube, Vimeo, etc..) for up to 500,000 streams total on all websites. A separate synchronization license will need to be purchased for distribution of video to Television, Film or Video game.
              
              Broadcast Rights. The Licensor hereby grants to Licensee a non-exclusive license to broadcast or air the Master Recording in two (2) radio stations through two (2) station channels, respectively. The Licensee shall not be permitted to receive compensation for such broadcasting.
              
              Credit. Licensee shall acknowledge the original authorship of the Composition appropriately and reasonably in all media and performance formats under the name "DJ John Doe" in writing where possible and vocally otherwise.
              
              Consideration. In consideration for the rights granted under this agreement, Licensee shall pay to licensor the sum of $24.44 US dollars and other good and valuable consideration, payable to "John Doe", receipt of which is hereby acknowledged. If the Licensee fails to account to the Licensor, timely complete the payments provided for hereunder, or perform its other obligations hereunder, including having insufficient bank balance, the licensor shall have the right to terminate License upon written notice to the Licensee. Such termination shall render the recording, manufacture and/or distribution of Recordings for which monies have not been paid subject to and actionable infringements under applicable law, including, without limitation, the United States Copyright Act, as amended.
              
              Delivery. The Composition shall be delivered via email to an email address that Licensee provided to Licensor. Licensee shall receive an email from containing an attachment or link from which they can download the Composition.
              
              Indemnification. Accordingly, Licensee agrees to indemnify and hold Licensor harmless from and against any and all claims, losses, damages, costs, expenses, including, without limitation, reasonable attorney's fees, arising of or resulting from a claimed breach of any of Licensee's representations, warranties or agreements hereunder.
              
              Audio Samples. 3rd party sample clearance is the responsibility of the Licensee.
              
              Miscellaneous. This license is non-transferable and is limited to the Composition specified above, does not convey or grant any right of public performance for profit, constitutes the entire agreement between the Licensor and the Licensee relating to the Composition, and shall be binding upon both the Licensor and the Licensee and their respective successors, assigns, and legal representatives.
              
              Governing Law. This License is governed by and shall be construed under the law of the State of Ile de France, France, without regard to the conflicts of laws principles thereof.
              
              Publishing.
              
              Kim Doe, owns 70% of publishing rights.
              John Doe, owns 30% of publishing rights.
              
              THE PARTIES HAVE DULY EXECUTED THIS AGREEMENT on the date first written above.
              
              Licensor:
              
              _______________________________________ Date: ______________, 20__
              
              John Doe - Producer
              Authorized Signing Officer
              
              Licensee:
              
              _______________________________________ Date: ______________, 20__
              
              Kim Doe - Artist
              Authorized Signing Officer`}
              active={active}
              setActive={setActive}
              id={1}
            />
            <Accordion
              title="Exclusive Contract"
              text={`
              EXCLUSIVE BEAT LICENSE AGREEMENT

              The Producer "NAME" (hereinafter referred to as the "Seller") in accordance with the terms stated in this agreement gives _Artist NAME. (hereinafter referred to as the "Buyer") the rights to exclusive beats _BEAT NAMES_ purchased from the seller. Buyer agrees to pay _______ per track. Total payment _____.
              
              RIGHTS GRANTED TO THE BUYER
              
              Buyer does have the worldwide, exclusive, transferable right for the use of the Music as long as additional audio/visual performances are recorded with our musical compositions (hereinafter referred to as “synchronization”) The Buyer is granted permission to sell or broadcast only in synchronization or mechanical reproduction with other visual or audio performances (vocals) added by Buyer. Rights include distribution of phono-record demos created using the Producer compositions. Buyer has distribution, performance and radio rights as long as they adhere to the following restrictions. Buyer understands that the rights that are being granted to the Buyer in this Agreement are exclusive and that the Seller will have the no authority and no right to issue other parties the right to use the Original Instrumental Composition that is being licensed in this agreement.
              
              1) The License expressly FORBIDS resale or other distribution of the Producer's compositions, either as they exist or any modification thereof. You CANNOT sell, loan, rent, lease, assign, remix, rearrange, remove any melodies, instruments, drum programming or transfer all OR any of the products sold or their rights under the Producer to another user (example - Record Label, another production company, another producer), or for use in any competitive product without written consent and or another license agreement.
              
              2) The Buyer understands that the Original Instrumental Composition that is being licensed in this agreement does not contain any unapproved samples. The Buyer also understands that they are responsible for clearing all samples that they choose to use and that the Seller cannot and will not be held liable for the misuse of any sampled material that the Buyer uses in conjunction with the Original Instrumental Composition that is being licensed in this agreement.
              
              3) Buyer cannot resell, lease or license any compositions to another user. The Buyer understands that The Seller maintains 100% copyright and ownership of the Original Instrumental Composition that is being licensed in this agreement.
              
              4) Buyer cannot use beat compositions as a background element in TV, Film and DVD projects without obtaining written consent and or another license agreement.
              
              5) Buyer must supply the Producer with at least 1 copy of each final recording made using the Producer's Music.
              
              6) Buyer must include on all productions the producer's name. Buyer agrees to display this statement on all physical media containing a portion or sum of the Original Instrumental Composition that is being licensed in this agreement. Including but not limited to CD’s, CD covers, Cassette tapes, Cards, etc.
              
              8) Buyer must contact and inform Seller of CD sales if the Original Instrumental Composition is used for commercial purposes with a record label with gross revenue of over $1,000,000, the Seller must receive credit for the Original Instrumental Composition, unless agreed upon otherwise by the two parties. Buyer must also contact and inform Seller if 150,000 units are sold so Seller can start receiving royalties.
              9) Use of the Producer's compositions in isolation (without synchronization of vocal performance) is not permitted.
              
              PERFORMANCE AGREEMENT
              
              1) Buyer has the right to perform with the Producer's music in public. If the Producer's music composition purchased by Buyer is exploited regionally, nationally or worldwide via radio, television, motion picture or in any other form of entertainment, Buyer must contact Seller so that Seller can take proper steps in obtaining any performance royalties generated.
              
              2) Buyer is the sole owner of the music referred to in this agreement. Buyer has no ownership of the Producer's copyrights.
              
              3) Buyer must comply with every aspect of this agreement or this license will be terminated.
              
              
              _______________________ _______________________
              Producer’s Signature Buyer’s Signature
              
              
              _______________
              Date`}
              active={active}
              setActive={setActive}
              id={2}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Licences;

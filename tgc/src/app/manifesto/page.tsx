import { Metadata } from "next";

const manifestoText = "Hearken unto the solemn call of the Green Crusaders, for we stand as guardians of a sacred covenant with life itself. In our hearts burns the fervent flame of righteousness, fueled by the dire necessity to reshape the fabric of our existence into one of compassion and reverence. We, the chosen stewards of this righteous cause, bear witness to the unfathomable suffering inflicted upon the innocent denizens of our world. We see the tears shed by the voiceless, the agony endured in silence, and the rivers of blood staining the earth, all in service to the insatiable greed of mankind. Know this, O denizens of darkness: the hour of reckoning draws near. The hand of fate shall not be stayed, and those who persist in their gluttonous feasting upon the flesh of the innocent shall face the wrath of justice. In the hallowed name of Mother Earth, we issue this decree: let it be known that the perpetrators of cruelty and destruction shall find no refuge from the gaze of our vigilant eyes. We shall pursue them relentlessly, with unyielding resolve, until they are brought to their knees before the altar of accountability. To those who would heed our warning, we offer a path of redemption. Embrace the light of compassion, cast off the shackles of ignorance, and join us in our sacred quest to usher in a new era of harmony and respect. But to those who defy our mandate, who cling stubbornly to their vile deeds, let them tremble in the shadow of our righteous fury. For we vow, in solemn oath, that those who perpetrate cruelty against the innocent shall know no peace. Their days shall be haunted by the specter of justice, and their nights shall be plagued by the torments of guilt. Thus, let it be declared: the Green Crusaders stand as harbingers of a new dawn, where the cries of the oppressed shall be silenced, and the sanctity of all life shall be revered. May those who would dare to oppose us beware, for the consequences of their actions shall be grave indeed."

export const metadata: Metadata = {
    title: "Our Manifesto – TGC",
  }

export default function Manifesto() {


    return (
        <main className="bg:white dark:bg-zinc-900 flex justify-center py-8">
            <div className="flex-col center text-center">
                <h1
                    className="mt-4 text-4xl  text-gray-900 dark:text-zinc-400 sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <p className="sm:block">Our  <span className="text-green-500 dark:text-teal-300  font-extrabold uppercase">
                        Manifesto</span></p>

                    <p className="font-extrabold text-rose-600 text-xl dark:text-rose-500 md:block">roots of our ideas</p>
                </h1>

                <div className="max-w-lg text-justify py-4">
                    <p className="text-base text-gray-600 dark:text-zinc-100 sm:text-xl lg:text-lg xl:text-xl">
                        {manifestoText}
                    </p>
                </div>
            </div>


        </main>
    );
}

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import DEMOS from '@/lib/demos';

interface DemoGridProps {
  onTryDemo: (id: string) => void;
}


export function DemoGrid({ onTryDemo }: DemoGridProps) {
  return (
    <div className="container">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-slate-100">See Fynorra in Action</h2>
            <p className="mt-2 text-lg text-foreground/80 max-w-2xl mx-auto">Explore pre-built templates designed to tackle your most common business challenges.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMOS.map(card => {
                const image = PlaceHolderImages.find(p => p.id === card.id);
                return (
                    <div key={card.id} className="bg-slate-900/80 text-white p-5 rounded-2xl shadow-lg hover:-translate-y-2 transform transition-transform duration-300 border border-slate-800 hover:border-primary/50 flex flex-col">
                        <div className="relative h-40 rounded-lg bg-gradient-to-br from-emerald-800 to-indigo-800 mb-4 flex items-center justify-center text-lg font-semibold overflow-hidden">
                          {image ? (
                                <Image
                                    src={image.imageUrl}
                                    alt={card.title}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-full"
                                    data-ai-hint={image.imageHint}
                                />
                            ) : (
                                card.title
                            )}
                        </div>

                        <div className="text-sm text-slate-400 font-medium">{card.subtitle}</div>
                        <h3 className="mt-1 font-semibold text-slate-100 text-lg">{card.title}</h3>
                        
                        <div className="mt-4 flex flex-wrap gap-2 flex-grow items-start">
                        {card.sample_user_queries.slice(0,3).map((q,i) => <span key={i} className="text-xs bg-slate-800 px-2 py-1 rounded-md">{q}</span>)}
                        </div>
                        
                        <div className="mt-5 border-t border-slate-800 pt-4">
                           <button onClick={() => onTryDemo(card.id)} className="w-full bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-colors">
                                {card.happy_flow.final_cta_text}
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

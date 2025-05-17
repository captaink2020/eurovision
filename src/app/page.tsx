'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils';

interface SongEntry {
    country: string;
    artist: string;
    song: string;
    emosh: number;
    banger: number;
    bonkers: number;
    pipes: number;
    totalScore: number;
    rank: number;
}

const initialSongs: SongEntry[] = [
    { country: "Norway", artist: "Kyle Alessandro", song: "Lighter", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Luxembourg", artist: "Laura Thorn", song: "La Poupée Monte Le Son", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Estonia", artist: "Tommy Cash", song: "Espresso Macchiato", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Israel", artist: "Yuval Raphael", song: "New Day Will Rise", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Lithuania", artist: "Katarsis", song: "Tavo Akys", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Spain", artist: "Melody", song: "ESA DIVA", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Ukraine", artist: "Ziferblat", song: "Bird of Pray", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "United Kingdom", artist: "Remember Monday", song: "What The Hell Just Happened?", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Austria", artist: "JJ", song: "Wasted Love", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Iceland", artist: "VÆB", song: "RÓA", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Latvia", artist: "Tautumeitas", song: "Bur Man Laimi", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Netherlands", artist: "Claude", song: "C’est La Vie", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Finland", artist: "Erika Vikman", song: "ICH KOMME", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Italy", artist: "Lucio Corsi", song: "Volevo Essere Un Duro", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Poland", artist: "Justyna Steczkowska", song: "GAJA", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Germany", artist: "Abor & Tynna", song: "Baller", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Greece", artist: "Klavdia", song: "Asteromáta", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Armenia", artist: "PARG", song: "SURVIVOR", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Switzerland", artist: "Zoë Më", song: "Voyage", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Malta", artist: "Miriana Conte", song: "SERVING", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Portugal", artist: "NAPA", song: "Deslocado", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Denmark", artist: "Sissal", song: "Hallucination", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Sweden", artist: "KAJ", song: "Bara Bada Bastu", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "France", artist: "Louane", song: "maman", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "San Marino", artist: "Gabry Ponte", song: "Tutta L’Italia", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
    { country: "Albania", artist: "Shkodra Elektronike", song: "Zjerm", emosh: 0, banger: 0, bonkers: 0, pipes: 0, totalScore: 0, rank: 0 },
];

// Flag URL mapping (using a simple object for demonstration)
const countryFlags: Record<string, string> = {
    "Norway": "https://flagcdn.com/w40/no.png",
    "Luxembourg": "https://flagcdn.com/w40/lu.png",
    "Estonia": "https://flagcdn.com/w40/ee.png",
    "Israel": "https://flagcdn.com/w40/il.png",
    "Lithuania": "https://flagcdn.com/w40/lt.png",
    "Spain": "https://flagcdn.com/w40/es.png",
    "Ukraine": "https://flagcdn.com/w40/ua.png",
    "United Kingdom": "https://flagcdn.com/w40/gb.png",
    "Austria": "https://flagcdn.com/w40/at.png",
    "Iceland": "https://flagcdn.com/w40/is.png",
    "Latvia": "https://flagcdn.com/w40/lv.png",
    "Netherlands": "https://flagcdn.com/w40/nl.png",
    "Finland": "https://flagcdn.com/w40/fi.png",
    "Italy": "https://flagcdn.com/w40/it.png",
    "Poland": "https://flagcdn.com/w40/pl.png",
    "Germany": "https://flagcdn.com/w40/de.png",
    "Greece": "https://flagcdn.com/w40/gr.png",
    "Armenia": "https://flagcdn.com/w40/am.png",
    "Switzerland": "https://flagcdn.com/w40/ch.png",
    "Malta": "https://flagcdn.com/w40/mt.png",
    "Portugal": "https://flagcdn.com/w40/pt.png",
    "Denmark": "https://flagcdn.com/w40/dk.png",
    "Sweden": "https://flagcdn.com/w40/se.png",
    "France": "https://flagcdn.com/w40/fr.png",
    "San Marino": "https://flagcdn.com/w40/sm.png",
    "Albania": "https://flagcdn.com/w40/al.png",
};

const EurovisionScoreApp = () => {
    const [songs, setSongs] = useState<SongEntry[]>(initialSongs);
    const [rankedSongs, setRankedSongs] = useState<SongEntry[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars    
    const [activeTab, setActiveTab] = useState('input');

    // Function to calculate total score
    const calculateTotalScore = useCallback((song: SongEntry) => {
        return song.emosh + song.banger + song.bonkers + song.pipes;
    }, []);

    // Function to update a song's score
    const updateSongScore = useCallback(
        (country: string, category: keyof Omit<SongEntry, 'country' | 'artist' | 'song' | 'totalScore' | 'rank'>, value: number) => {
            setSongs(prevSongs =>
                prevSongs.map(song => {
                    if (song.country === country) {
                        const updatedSong = { ...song, [category]: value };
                        const newTotalScore = calculateTotalScore(updatedSong);
                        return { ...updatedSong, totalScore: newTotalScore };
                    }
                    return song;
                })
            );
        },
        [calculateTotalScore]
    );

    // Function to determine ranks
    const determineRanks = useCallback(() => {
        const sortedSongs = [...songs].sort((a, b) => b.totalScore - a.totalScore);
        const rankedSongs = sortedSongs.map((song, index) => ({
            ...song,
            rank: index + 1,
        }));
        setRankedSongs(rankedSongs);
    }, [songs]);

    // Recalculate totals whenever scores change
    useEffect(() => {
        setSongs(prevSongs =>
            prevSongs.map(song => ({
                ...song,
                totalScore: calculateTotalScore(song),
            }))
        );
    }, [calculateTotalScore]);

    // Determine ranks when songs or totalScores change
    useEffect(() => {
        determineRanks();
    }, [determineRanks]);

    // Handler for resetting all scores
    const handleResetScores = () => {
        setSongs(initialSongs);
        setActiveTab('input'); // Switch back to input tab after reset.
        setRankedSongs([]);
    };

    return (
        <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center text-white">
                Eurovision Score Sheet 2025
            </h1>

            <Tabs defaultValue="input" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger
                        value="input"
                        className="text-gray-400 data-[state=active]:bg-gray-800 data-[state=active]:text-white
                                      data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300"
                    >
                        Input Scores
                    </TabsTrigger>
                    <TabsTrigger
                        value="ranking"
                        className="text-gray-400 data-[state=active]:bg-gray-800 data-[state=active]:text-white
                                      data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300"
                    >
                        View Ranking
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="input">
                    <div className="space-y-6">
                        {songs.map((song) => (
                            <div key={song.country} className="p-4 rounded-md border border-gray-800">
                                <div className="flex items-center gap-2 mb-2">
                                    {countryFlags[song.country] && (
                                        <img
                                            src={countryFlags[song.country]}
                                            alt={`${song.country} flag`}
                                            className="w-6 h-4 rounded"
                                        />
                                    )}
                                    <h2 className="text-lg font-semibold text-white">{song.country}</h2>
                                </div>
                                <h3 className="text-md text-gray-300 mb-1">{song.artist}</h3>
                                <p className="text-sm text-gray-400 mb-4">{song.song}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label htmlFor={`emosh-${song.country}`} className="block text-sm font-medium text-gray-300">Emosh (/10)</label>
                                        <Input
                                            id={`emosh-${song.country}`}
                                            type="number"
                                            min="0"
                                            max="10"
                                            value={song.emosh === 0 ? '' : song.emosh} // Use empty string if 0
                                            onChange={(e) =>
                                                updateSongScore(song.country, 'emosh', parseInt(e.target.value, 10) || 0)
                                            }
                                            className="mt-1 bg-gray-800 text-white border-gray-700 w-full"
                                            placeholder="-"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`banger-${song.country}`} className="block text-sm font-medium text-gray-300">Banger (/10)</label>
                                        <Input
                                            id={`banger-${song.country}`}
                                            type="number"
                                            min="0"
                                            max="10"
                                            value={song.banger === 0 ? '' : song.banger}  // Use empty string if 0
                                            onChange={(e) =>
                                                updateSongScore(song.country, 'banger', parseInt(e.target.value, 10) || 0)
                                            }
                                            className="mt-1 bg-gray-800 text-white border-gray-700 w-full"
                                            placeholder="-"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`bonkers-${song.country}`} className="block text-sm font-medium text-gray-300">Bonkers (/10)</label>
                                        <Input
                                            id={`bonkers-${song.country}`}
                                            type="number"
                                            min="0"
                                            max="10"
                                            value={song.bonkers === 0 ? '' : song.bonkers}  // Use empty string if 0
                                            onChange={(e) =>
                                                updateSongScore(song.country, 'bonkers', parseInt(e.target.value, 10) || 0)
                                            }
                                            className="mt-1 bg-gray-800 text-white border-gray-700 w-full"
                                            placeholder="-"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={`pipes-${song.country}`} className="block text-sm font-medium text-gray-300">Pipes (/10)</label>
                                        <Input
                                            id={`pipes-${song.country}`}
                                            type="number"
                                            min="0"
                                            max="10"
                                            value={song.pipes === 0 ? '' : song.pipes} // Use empty string if 0
                                            onChange={(e) =>
                                                updateSongScore(song.country, 'pipes', parseInt(e.target.value, 10) || 0)
                                            }
                                            className="mt-1 bg-gray-800 text-white border-gray-700 w-full"
                                            placeholder="-"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="ranking">
                    <div className="rounded-md border border-gray-800 overflow-x-auto mt-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-white">Rank</TableHead>
                                    <TableHead className="text-white">Country</TableHead>
                                    <TableHead className="text-white">Artist</TableHead>
                                    <TableHead className="text-white">Song</TableHead>
                                    <TableHead className="text-white">Total Score</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rankedSongs.map((song) => (
                                    <TableRow key={song.country} className={cn(
                                        "hover:bg-gray-800/50 transition-colors",
                                        song.rank <= 3 ? "bg-gradient-to-r from-yellow-500/10 to-transparent" : "", // Highlight top 3
                                        song.rank === 1 ? "font-bold" : ""
                                    )}>
                                        <TableCell className="font-medium text-white">{song.rank}</TableCell>
                                        <TableCell className="text-white flex items-center gap-2">
                                            {countryFlags[song.country] && (
                                                <img
                                                    src={countryFlags[song.country]}
                                                    alt={`${song.country} flag`}
                                                    className="w-6 h-4 rounded"
                                                />
                                            )}
                                            {song.country}
                                        </TableCell>
                                        <TableCell className="text-white">{song.artist}</TableCell>
                                        <TableCell className="text-white">{song.song}</TableCell>
                                        <TableCell className="font-semibold text-white">{song.totalScore}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="mt-4 md:mt-6 flex justify-center">
                <Button
                    onClick={handleResetScores}
                    className="bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300
                              border border-red-500/30 transition-all duration-200"
                >
                    Reset All Scores
                </Button>
            </div>
        </div>
    );
};

export default EurovisionScoreApp;

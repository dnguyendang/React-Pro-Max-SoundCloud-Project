'use client'
import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import './wave.scss';
import { PauseCircleOutline, PlayArrowOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const WaveTrack = (props: any) => {

    const searchParams = useSearchParams();
    const fileName = searchParams.get('audio');

    const containerRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string>("0:00");
    const [duration, setDuration] = useState<string>("0:00");

    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        let gradient, progressGradient;

        if (typeof window !== 'undefined') {
            //create a canvas gradient for wave color
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;

            // Define the waveform gradient
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1)
            gradient.addColorStop(0, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient.addColorStop(1, '#B1B1B1') // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }

        return {
            waveColor: gradient,
            progressColor: progressGradient,
            url: `/api?audio=${fileName}`, // remote 
            barWidth: 3,
            height: 100,
        }
    }, [])

    const wavesurfer = useWavesurfer(containerRef, optionsMemo);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (!wavesurfer) return;
        setIsPlaying(false);

        // Hover effect
        const hover = hoverRef.current!
        const waveform = containerRef.current!;
        //@ts-ignore
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subcriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('finish', () => setIsPlaying(false)),
            wavesurfer.on('decode', (duration) => {
                setDuration(formatTime(duration))
            }),
            wavesurfer.on('timeupdate', (currentTime) => {
                setTime(formatTime(currentTime))
            }),
            wavesurfer.once('interaction', () => {
                wavesurfer.play();
            })
        ]

        return () => {
            subcriptions.forEach((unsub) => unsub());
        }
    }, [wavesurfer]);

    // on play button click
    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
        }

    }, [wavesurfer]);

    // Current time & duration
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 30,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 50,
            user: "username 3",
            content: "just a comment3"
        },
    ]

    const calLeft = (moment: number) => {
        const hardCodeDuration = 199;
        const percent = moment / hardCodeDuration * 100;
        return `${percent}%`
    }

    return (
        <div style={{ marginTop: 20 }}>
            <div
                style={{
                    display: 'flex',
                    gap: 15,
                    padding: 20,
                    height: 400,
                    background: 'linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)'
                }}
            >
                <div className="left"
                    style={{
                        width: "75%",
                        height: "calc(100%-10px)",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <div className="info" style={{ display: 'flex' }}>
                        <div>
                            <div
                                onClick={() => onPlayClick()}
                                style={{
                                    borderRadius: '50%',
                                    background: "#f50",
                                    height: "50px",
                                    width: "50px",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                {isPlaying === true ?
                                    <PauseCircleOutline
                                        sx={{ fontSize: 30, color: "white" }}
                                    />
                                    :
                                    <PlayArrowOutlined
                                        sx={{ fontSize: 30, color: "white" }}
                                    />
                                }
                            </div>
                        </div>
                        <div style={{ marginLeft: 20 }}>
                            <div style={{
                                padding: '0 5px',
                                background: "#333",
                                fontSize: 30,
                                width: 'fit-content',
                                color: 'white',
                            }}>
                                DungND 's song
                            </div>
                            <div style={{
                                padding: '0 5px',
                                marginTop: 10,
                                background: "#333",
                                fontSize: 20,
                                width: 'fit-content',
                                color: 'white',
                            }}>
                                Dung
                            </div>
                        </div>
                    </div>
                    <div ref={containerRef} className="wave-form-container">
                        <div className="time" id="time">{time}</div>
                        <div className="duration" id="duration">{duration}</div>
                        <div ref={hoverRef} className="hover" id="hover"></div>
                        <div className="overlay" style={{
                            position: 'absolute',
                            height: '30px',
                            width: '100%',
                            bottom: 0,
                            backdropFilter: 'brightness(0.5)',
                        }}></div>
                        <div className="comments"
                            style={{ position: 'relative' }}
                        >
                            {
                                arrComments.map(item => {
                                    return (
                                        <Tooltip
                                            title={item.content}
                                            arrow
                                        >
                                            <img
                                                onPointerMove={(e) => {
                                                    const hover = hoverRef.current!;
                                                    hover.style.width = calLeft(item.moment);
                                                }}
                                                key={item.id}
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    position: 'absolute',
                                                    top: 75,
                                                    zIndex: 20,
                                                    left: calLeft(item.moment)
                                                }}
                                                src={`http://localhost:8000/images/chill1.png`}
                                            />
                                        </Tooltip>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="right">
                    Right
                </div>
            </div>
        </div>
    )
}
export default WaveTrack;
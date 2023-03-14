// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsiveLine } from '@nivo/line'

const LineChart = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        margin={{top: 5, right: 0, bottom: 0, left: 0 }}
        colors={{datum: 'color'}}
        data={data}
        animate={true}
        enableSlices={'x'}
        enableArea={true}
        areaOpacity={0.05}
        enableGridX={false}
        enableGridY={false}
        pointLabel={false}
        theme={{
            "textColor": "rgba(255,255,255,0.5)",
            "axis": {
                "domain": {
                    "line": {
                        "stroke": "#fff",
                        opacity: "0"
                    }
                }
            }
        }}
        sliceTooltip={({slice}) => {
            return (
                <div
                    style={{
                        background: '#0D0F16',
                        padding: '9px 12px',
                        borderRadius: '10px'
                    }}
                >
                    <div
                            style={{
                                padding: '3px 0px',
                                color: '#fff'
                            }}
                        >
                           Proyectos: {slice.points[0].data.y}
                        </div>
                </div>
            )
        }}
        
        
        xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            useUTC: false,
            precision: 'day',
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
            type: 'linear',
            stacked: false
        }}
        axisLeft={null}
        axisBottom={null}
        curve={'cardinal'}
        enablePointLabel={false}
        pointSize={0}
        pointBorderWidth={1}
        pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
        }}
        useMesh={true}
    />
)

export default LineChart
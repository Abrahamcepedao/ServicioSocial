// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radial-bar
import { ResponsiveRadialBar } from '@nivo/radial-bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveRadialBar = ({ data /* see data tab */ }) => (
    <ResponsiveRadialBar
        data={data}
        colors={{ scheme: 'paired' }}
        valueFormat=" >-.2f"
        padding={0.65}
        cornerRadius={25}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        enableRadialGrid={false}
        enableCircularGrid={false}
        radialAxisStart={null}
        circularAxisOuter={null}
        labelsSkipAngle={4}
        isInteractive={false}
    />
)

export default MyResponsiveRadialBar
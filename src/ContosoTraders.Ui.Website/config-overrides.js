import { override, addBabelPlugins } from 'customize-cra'

export default override(
    addBabelPlugins(
        'babel-plugin-istanbul',
    )
)
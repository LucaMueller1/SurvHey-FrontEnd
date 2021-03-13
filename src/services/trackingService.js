import axios from 'axios';
import {environment} from '../environments/environment';
import publicIp from "public-ip";

export class trackingService {

    static async getClientIp() {
        return await publicIp.v4({
            fallbackUrls: [ "https://ifconfig.co/ip" ]
        });
    }

}

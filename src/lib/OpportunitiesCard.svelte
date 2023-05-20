<script>
    import {parseISO} from "date-fns";
    import {formatInTimeZone} from "date-fns-tz";

    export let opportunity;
</script>

<div class="card card-side bg-base-200 border border-base-300">
    <div class="card-body">
        <h2 class="card-title">{opportunity.name}</h2>
        <div>
            <p class="break-all">{opportunity.description}</p>
        </div>
        <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-clock inline" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
            </svg>
            <!--            Format our ISO time string into a nice date, -->
            <!--            Note that the formatting must be handled in UTC because our dates are stored in UTC (even though the stored time doesn't actually matter for us) -->
            Apply by {formatInTimeZone(parseISO(opportunity.deadline), "UTC", "PPP")}</p>

        <div class="card-actions justify-start">
            <a class="btn btn-primary btn-sm" href="{opportunity.url}" target="_blank" rel="noreferrer">Apply
                Now</a>
        </div>
    </div>
</div>